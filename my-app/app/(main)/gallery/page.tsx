'use client';

// Force dynamic rendering to ensure fresh NextAuth session data and prevent caching issues
export const dynamic = 'force-dynamic';

import { getAllImages } from '@/app/actions/getAllImages';
import FullScreenImageViewer from '@/app/components/FullScreenImageViewer';
import MasonryGrid from '@/app/components/MansoryGrid';
import MobileMenuOpener from '@/app/components/MobileMenuOpener';
import { useFullScreenImage } from '@/app/stores/fullScreenImage.store';
import { useImageStore } from '@/app/stores/image.store';
import { useTagStore } from '@/app/stores/tag.store';
// If I'm going to import all.scss means that I'm applying all styles coming from all .scss file that I'm adding in All.scss
// Now I can use directly the classname coming from all.scss that it will work
import '../../styles/all.scss';
import { useEffect } from 'react';

export default function GalleryPage() {
	const images = useImageStore((state) => state.images);
	const setImages = useImageStore((state) => state.setImages);
	const fullScreenImage = useFullScreenImage((state) => state.FullScreenImage);
	const setNewTags = useTagStore((state) => state.setTags);
	const clearAllImages = useImageStore((store) => store.clearAll);

	useEffect(() => {
		clearAllImages();
		const initiateGalleryPagePage = async () => {
			// Getting All Images
			const data = await getAllImages();
			if (Array.isArray(data) && data.length > 0) {
				setImages(data);
				setNewTags(data);
			}
		};
		initiateGalleryPagePage();

		return () => {
			clearAllImages();
		};
	}, []);

	return (
		<>
			{/* This makes the fuji logo stopping being showing if the full screen image is true */}
			{/* Also the Mobile Menu Opener being inside the div with the display-... class makes it invisible within big screen to avoid to have a big empty space */}
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
		</>
	);
}
