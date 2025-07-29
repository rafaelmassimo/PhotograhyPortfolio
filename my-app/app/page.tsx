'use client';

// If I'm going to import all.scss means that I'm applying all styles coming from all .scss file that I'm adding in All.scss
// Now I can use directly the classname coming from all.scss that it will work
import './styles/all.scss';

import { useEffect, useState } from 'react';
import { useImageStore } from './stores/image.store';
import { getAllImages } from './actions/getAllImages';
import ImageBox from './components/imageBox';
import TagSelector from './components/tagSelector';
import Link from 'next/link';
import MansoryGrid from './components/MansoryGrid';
import MasonryGrid from './components/MansoryGrid';

export default function Home() {
	const images = useImageStore((state) => state.images);
	const setImages = useImageStore((state) => state.setImages);

	useEffect(() => {
		const initiateHomePage = async () => {
			// Getting All Images
			const data = await getAllImages();
			if (Array.isArray(data) && data.length > 0) {
				setImages(data);
			}
		};
		initiateHomePage();
	}, []);

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
						<MasonryGrid images={images} />
					</div>
				</div>
			</div>
		</>
	);
}
