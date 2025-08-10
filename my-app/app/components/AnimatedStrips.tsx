'use client';

import { useEffect, useState } from 'react';
import { getAllImageByTagForHome } from '../actions/GetAllImagesByTagForHome';
import { ImageStrip } from './ImageStrip';

type ImageType = {
	tag: string;
	file: string;
};

export default function AnimatedStrips() {
	// Store all tags and their images in one state as a dictionary
	const [imagesByTag, setImagesByTag] = useState<Record<string, ImageType[]>>({});

	// Define tags and their speeds in one place
	const tagsWithSpeed = [
		{ tag: 'StreetPhotography', speed: 20 },
		{ tag: 'Landscape', speed: 30 },
		{ tag: 'Wild&Tame', speed: 40 },
		{ tag: 'Portrait', speed: 50 },
	];

	useEffect(() => {
		const fetchAllImages = async () => {
			try {
                const newImagesByTag: Record<string, ImageType[]> = {};

				// Fetch images for all tags in parallel
				await Promise.all(
					tagsWithSpeed.map(async ({ tag }) => {
						const res = await getAllImageByTagForHome(tag);
						if (res && res.length > 0) {
							newImagesByTag[tag] = res.map((img) => ({
								tag: img.tag as string,
								file: img.url as string,
							}));
						} else {
							newImagesByTag[tag] = [];
						}
					}),
				);

				setImagesByTag(newImagesByTag);
			} catch (error) {
				console.error(error);
			}
		};

		fetchAllImages();
	}, []);

	return (
		<div className="flex flex-col gap-4">
			{tagsWithSpeed.map(({ tag, speed }) => (
				<ImageStrip key={tag} images={imagesByTag[tag] || []} speed={speed} />
			))}
		</div>
	);
}
