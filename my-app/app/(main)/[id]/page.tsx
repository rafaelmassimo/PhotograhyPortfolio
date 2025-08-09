'use client';

import { getImagesByTag } from '@/app/actions/getImagesByTag';
import FullScreenImageViewer from '@/app/components/FullScreenImageViewer';
import MasonryGrid from '@/app/components/MansoryGrid';
import MobileMenuOpener from '@/app/components/MobileMenuOpener';
import { useFullScreenImage } from '@/app/stores/fullScreenImage.store';
import { useImageStore } from '@/app/stores/image.store';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

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
					{/** Also here I have the class that makes the mobile menu opener being hided in big screen */}
					{fullScreenImage.length === 0 && (
						<div className="display-mobile-menu h-16 flex items-center justify-center relative">
							<MobileMenuOpener />
						</div>
					)}
					<div className="w-full min-h-screen flex flex-col">
						<div className="flex-1">
							<div className="px-4">
								<MasonryGrid images={images} />
							</div>

							{fullScreenImage && <FullScreenImageViewer />}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ImagesFiltered;
