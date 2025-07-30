'use client';

// If I'm going to import all.scss means that I'm applying all styles coming from all .scss file that I'm adding in All.scss
// Now I can use directly the classname coming from all.scss that it will work
import './styles/all.scss';
import { useEffect, useState } from 'react';
import { useImageStore } from './stores/image.store';
import { getAllImages } from './actions/getAllImages';
import MasonryGrid from './components/MansoryGrid';
import FullScreenImageViewer from './components/FullScreenImageViewer';
import { useFullScreenImage } from './stores/fullScreenImage.store';
import { useTagStore } from './stores/tag.store';

export default function Home() {
	const images = useImageStore((state) => state.images);
	const setImages = useImageStore((state) => state.setImages);
	const fullScreenImage = useFullScreenImage((state) => state.FullScreenImage);
	const setNewTags = useTagStore((state) => state.setTag);

	useEffect(() => {
		const initiateHomePage = async () => {
			// Getting All Images
			const data = await getAllImages();
			if (Array.isArray(data) && data.length > 0) {
				setImages(data);
				setNewTags(data);
			}
		};
		initiateHomePage();
	}, []);

	return (
		<>
			<div className="w-full">
				<div>
					<div className="px-4">
						<MasonryGrid images={images} />
					</div>

					{fullScreenImage && <FullScreenImageViewer />}
				</div>
			</div>
		</>
	);
}
