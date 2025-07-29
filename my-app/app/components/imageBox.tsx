'use client';

import '../styles/all.scss'

import React, { useState } from 'react';
import { ImageType } from '../models/image.model';
import { CldImage } from 'next-cloudinary';

const ImageBox = ({ imageFile }: { imageFile: ImageType }) => {
	const [isLoading, setIsLoading] = useState(true);
	const isPortrait = imageFile.height! > imageFile.width!;

	const randomSizes = () => {
		if(isPortrait) {
			const portraitSizes = ['portrait-small', 'portrait-medium', 'portrait-large'];
			return portraitSizes[Math.floor(Math.random() * portraitSizes.length)];
		} else {
			const landscapeSizes = ['landscape-small', 'landscape-medium', 'landscape-large']
			return landscapeSizes[Math.floor(Math.random() * landscapeSizes.length)]
		}
	}

	return (
		<div
			className={`relative ${isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]' } }`}
			key={imageFile._id?.toString()}
		>
			{/* Loading overlay */}
			{isLoading && (
				<div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
					<p className="text-sm text-gray-700">Loading...</p>
				</div>
			)}

			{/* Image always renders, but we hide loader when it's ready */}
			<CldImage
				src={imageFile.file}
				alt={imageFile.title}
				preserveTransformations
				loading="lazy"
				fill
				onLoad={() => setIsLoading(false)}
			/>
		</div>
	);
};

export default ImageBox;
