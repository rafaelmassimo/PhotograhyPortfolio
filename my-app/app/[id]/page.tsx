'use client';

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useImageStore } from '../stores/image.store';
import { getImagesByTag } from '../actions/getImagesByTag';
import FullScreenImageViewer from '../components/FullScreenImageViewer';
import MasonryGrid from '../components/MansoryGrid';
import { useFullScreenImage } from '../stores/fullScreenImage.store';
import MobileMenuOpener from '../components/MobileMenuOpener';

const ImagesFiltered = () => {
	const { id: tag } = useParams();
	const images = useImageStore((store) => store.images);
	const setImages = useImageStore((store) => store.setImages);
	const clearAllImages = useImageStore((store) => store.clearAll);
	const fullScreenImage = useFullScreenImage((state) => state.FullScreenImage);

	useEffect(() => {
		// Decode the URL parameter to get the original tag value
		const decodedTag = tag ? decodeURIComponent(tag.toString()) : '';
		console.log(decodedTag);
		
		clearAllImages();

		const initiateFilteredPage = async () => {
			//* Getting All Filtered Images
			const data = await getImagesByTag(decodedTag);
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
			<div className="w-full">
				<div>
					{/* If is true that fullScreenImage is empty than render the following element */}
					{fullScreenImage.length === 0 && (
						<div className="display-mobile-menu h-16 flex items-center justify-center relative">
							<MobileMenuOpener />
						</div>
					)}
					<div className="px-4">
						<MasonryGrid images={images} />
					</div>

					{fullScreenImage && <FullScreenImageViewer />}
				</div>
			</div>
		</>
	);
};

export default ImagesFiltered;
