'use client';

import { getSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { getAllImages } from '../actions/getAllImages';
import { useImageStore } from '../stores/image.store';
import { getImagesByTag } from '../actions/getImagesByTag';
import { ImageBox } from '../components/imageBox';
import Link from 'next/link';
import FullScreenImageViewer from '../components/FullScreenImageViewer';
import MasonryGrid from '../components/MansoryGrid';
import TagSelector from '../components/tagSelector';
import { useFullScreenImage } from '../stores/fullScreenImage.store';

const ImagesFiltered = () => {
	const { id: tag } = useParams();

	const images = useImageStore((store) => store.images);
	const setImages = useImageStore((store) => store.setImages);
	const clearAllImages = useImageStore((store) => store.clearAll);
	const fullScreenImage = useFullScreenImage((state) => state.FullScreenImage);

	useEffect(() => {
		const initiateFilteredPage = async () => {
			clearAllImages();
			//* Getting All Filtered Images
			const data = await getImagesByTag(tag as string);
			if (Array.isArray(data) && data.length > 0) {
				setImages(data);
			}
		};
		initiateFilteredPage();

		// Cleanup: clear images when this component unmounts
		return () => {
			clearAllImages();
		};
	}, [tag]);

	return (
		<>
			<div className="flex flex-col w-full">
				<Link href={'/addImage'}>add image</Link>
				<div className="flex flex-row items-center justify-between mx-4">
					hello homepage
					<TagSelector />
				</div>
				<div className="">
					<div className="px-4">
						{/* //I'm passing the function  */}
						<MasonryGrid images={images} />
					</div>

					{fullScreenImage && (
						//When you click on closingViewer you'll set the urlImageFullScreen as null so this element will stop to being showed
						<FullScreenImageViewer />
					)}
				</div>
			</div>
		</>
	);
};

export default ImagesFiltered;
