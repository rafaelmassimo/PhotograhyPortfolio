'use client';

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useImageStore } from '../stores/image.store';
import { getImagesByTag } from '../actions/getImagesByTag';
import FullScreenImageViewer from '../components/FullScreenImageViewer';
import MasonryGrid from '../components/MansoryGrid';
import { useFullScreenImage } from '../stores/fullScreenImage.store';
import { useSession } from 'next-auth/react';
import MobileMenu from '../components/MobileMenu';

const ImagesFiltered = () => {
	const { id: tag } = useParams();
	const images = useImageStore((store) => store.images);
	const setImages = useImageStore((store) => store.setImages);
	const clearAllImages = useImageStore((store) => store.clearAll);
	const fullScreenImage = useFullScreenImage((state) => state.FullScreenImage);

	useEffect(() => {
		const initiateFilteredPage = async () => {
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
			<div className="w-full">
				<div>
					<div className='h-16 flex items-center justify-center relative'>
						<MobileMenu />
					</div>
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
