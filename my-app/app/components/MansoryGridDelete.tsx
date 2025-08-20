'use client';

import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { ImageType } from '../models/image.model';
import toast from 'react-hot-toast';
import { MoonLoader } from 'react-spinners';
import '../styles/all.scss';
import deleteImage from '../actions/deleteImage';
import { editImageTag } from '../actions/editImageTag';
import { getAllTags } from '../actions/getAllTags';
import { useImageStore } from '../stores/image.store';
import { useTagStore } from '../stores/tag.store';
import { ImageBox } from './imageBox';
import LoadingImages from './LoadingImages';

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
	const deleteImageStore = useImageStore((state) => state.deleteImage);
	const getImages = useImageStore((store) => store.images);
	const clearTags = useTagStore((store) => store.clearAll);
	const setNewTagsByTags = useTagStore((store) => store.setAddNewTag);
	const [imageToDelete, setImageToDelete] = useState<string | undefined>('');
	const [ModifyTag, setModifyTag] = useState<string>('');
	const [ModifyTitle, setModifyTitle] = useState<string>('');

	const handleDeleteImage = async (imageId: string) => {
		setImageToDelete(imageId);

		try {
			const res = await deleteImage(imageId);
			if (res?.status === 200) {
				//* Remove this image from store
				deleteImageStore(imageId);

				//* Update Tags store
				const remainedImages = getImages.filter((img) => img._id?.toString() !== imageId);

				clearTags();
				// setNewTags(remainedImages);
				setNewTagsByTags(await getAllTags());

				//*User feedback
				toast.success('Image deleted');
			} else if (res?.error) {
				toast.error(res.error);
			}
		} catch (error) {
			toast.error((error as Error)?.message ?? 'Unknown Error While Deleting Image');
		} finally {
			setImageToDelete(undefined);
		}
	};

	const handleEditTag = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const owner = formData.get('owner') as string;
		const imageId = formData.get('imageId') as string;
		const newTag = formData.get('tag') as string;
		const title = formData.get('title') as string;

		try {
			const res = await editImageTag(imageId!, owner!, newTag!, title!);
			if (res) {
				clearTags();
				setNewTagsByTags(await getAllTags());
				toast.success(res.message);
			}
		} catch (error) {
			console.error(error);
			toast.error('Error during editing tag');
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
				<div key={image._id?.toString()} className="masonry-item overflow-hidden mx-auto">
					<ImageBox imageFile={image} />

					<div className="mt-2">
						{/* Here I'm comparing if the ID that has been set from calling handleDeleteImage is the same inside this loop, if yes then show the LoadingImages
after that will be set as undefined to will stop to show the loading */}
						{imageToDelete === image._id?.toString() ? (
							<button className="btn btn-error w-40">
								Deleting <MoonLoader color="#4d26bb" size={20} />
							</button>
						) : (
							<button
								onClick={() => handleDeleteImage(image._id!.toString())}
								className="btn btn-error w-40"
							>
								Delete
							</button>
						)}

						<form onSubmit={handleEditTag} className="flex flex-col">
							<input name="owner" hidden type="text" defaultValue={image.owner?.toString()} />
							<input name="imageId" hidden type="text" defaultValue={image._id?.toString()} />
							{/* Little form Edit Title */}
							{imageToDelete === image._id?.toString() ? (
								<div className="flex gap-2">
									<label htmlFor="title">Title: </label>
									<input
										name="title"
										type="text"
										placeholder={image.title}
										defaultValue={ModifyTitle}
										onChange={(e) => setModifyTitle(e.target.value)}
										className="text-xs placeholder:text-xs placeholder:w-fit placeholder:p-1 placeholder:rounded-lg"
									/>
								</div>
							) : (
								<div className="flex gap-2 my-2">
									<label htmlFor="title">Title: </label>
									<input
										name="title"
										type="text"
										className="text-xs placeholder:text-xs placeholder:w-fit placeholder:p-1 placeholder:rounded-lg"
										placeholder={image.title}
									/>
								</div>
							)}
							{/* Little form Edit Tag */}
							{imageToDelete === image._id?.toString() ? (
								<div className="flex gap-2">
									<label htmlFor="tag">Tag: </label>
									<input
										name="tag"
										type="text"
										placeholder={image.tag}
										defaultValue={ModifyTag}
										onChange={(e) => setModifyTag(e.target.value)}
										className="text-xs placeholder:text-xs placeholder:w-fit placeholder:p-1 placeholder:rounded-lg"
									/>
								</div>
							) : (
								<div className="flex gap-2">
									<label htmlFor="tag">Tag: </label>
									<input
										name="tag"
										type="text"
										placeholder={image.tag}
										className="text-xs placeholder:text-xs placeholder:w-fit placeholder:p-1 placeholder:rounded-lg"
									/>
								</div>
							)}

							<button className="btn btn-success w-40 mt-2" type="submit">
								Save
							</button>
						</form>
					</div>
				</div>
			))}
		</Masonry>
	);
};

export default MasonryGridDelete;
