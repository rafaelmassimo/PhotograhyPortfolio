'use client';

import { useEffect, useState } from 'react';
import { getAllImageByTagForHome } from '../actions/GetAllImagesByTagForHome';
import { ImageStrip } from './ImageStrip';
import { useImageStore } from '../stores/image.store';
import { toPascalCase } from '../utils/functions';
import passions from '../utils/passionsDescriptions';
import { ImageType } from '../models/image.model';

export default function AnimatedStrips() {
	const imageStore = useImageStore((state) => state.images);
	const [imagesToBeRendered, setImagesToBeRendered] = useState<any[]>([]);

	useEffect(() => {
		if (imageStore.length > 0) {
			const fetchAllImages = () => {
				const imagesWithTags: any[] = [];

				for (const passion of passions) {
					// Find all images that match this passion's tag
					const foundImages = imageStore.filter(
						(image) => image.tag === toPascalCase(passion.title) && image.tag !== 'StreetPhotography',
					);

					if (foundImages.length > 0) {
						imagesWithTags.push({
							tag: toPascalCase(passion.title),
							images: foundImages,
						});
					}
				}
				setImagesToBeRendered(imagesWithTags);
			};

			fetchAllImages();
		}
	}, [imageStore]);

	return (
		<div className="flex flex-col gap-4 ">
			{imagesToBeRendered?.map(({ images, tag }, index) => (
				<div key={`${tag}-${index}`}>
					<ImageStrip images={images} speed={30 + 10 * index} />
				</div>
			))}
		</div>
	);
}
