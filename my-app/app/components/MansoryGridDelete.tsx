'use client';

import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { ImageType } from '../models/image.model';

import '../styles/all.scss';
import { ImageBox } from './imageBox';
import LoadingImages from './LoadingImages';
import { MoonLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useImageStore } from '../stores/image.store';
import { useTagStore } from '../stores/tag.store';
import deleteImage from '../actions/deleteImage';

const breakpointColumnsObj = {
	default: 3,
	1100: 3,
	700: 2,
	500: 2,
};

interface MasonryGridProps {
	images: ImageType[];
}
const MasonryGridDelete: React.FC<MasonryGridProps> = ({ images }) => {
	const deleteImageStore = useImageStore((state) => state.deleImage);
	const getImages = useImageStore((store) => store.images)
	const clearTags = useTagStore((store)=> store.clearAll);
	const setNewTags = useTagStore((store)=> store.setTag);
	const [startDeleting, setStartDeleting] = useState<boolean>(false);

	const handleDeleteImage = async (imageId: string, imageTag: string) => {
		setStartDeleting(true);

		try {
			const res = await deleteImage(imageId);
			if (res?.status === 200) {
				//* Remove this image from store
				deleteImageStore(imageId);

				//* Update Tags store
				const remainedImages = getImages.filter((img) => img._id?.toString() !== imageId);
				clearTags();
				setNewTags(remainedImages);

				//*User feedback
				toast.success('Image deleted');
			} else if (res?.error) {
				toast.error(res.error);
			}
		} catch (error) {
			toast.error((error as Error)?.message ?? 'Unknown Error While Deleting Image');
		} finally {
			setStartDeleting(false);
		}
	};

	if (images.length === 0) {
		return (
			<div className="flex flex-col justify-start items-center">
				<LoadingImages />
			</div>
		);
	}
	return (
		<Masonry
			breakpointCols={breakpointColumnsObj}
			className="my-masonry-grid"
			columnClassName="my-masonry-grid_column"
		>
			{images.map((image) => (
				<div key={image._id?.toString()} className="masonry-item">
					<ImageBox imageFile={image} />

					{startDeleting ? (
						<button
							onClick={() => {
								setStartDeleting(!startDeleting);
							}}
							className="btn btn-error"
						>
							Deleting <MoonLoader color="#4d26bb" size={20} />
						</button>
					) : (
						<button
							onClick={() => handleDeleteImage(image._id!.toString(), image.tag)}
							className="btn btn-error"
						>
							Delete
						</button>
					)}

					<br />
					<span>Title: {image.title}</span>
					<br />
					<span>Tag: {image.tag}</span>
				</div>
			))}
		</Masonry>
	);
};

export default MasonryGridDelete;
