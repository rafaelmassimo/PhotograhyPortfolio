'use client';

import '../styles/all.scss';

import React, { useState, useEffect, useRef } from 'react';
import { ImageType } from '../models/image.model';
import { CldImage } from 'next-cloudinary';

const ImageBox = ({ imageFile }: { imageFile: ImageType }) => {
	const [isLoading, setIsLoading] = useState(true);


	return (
		<div className={'image-container'} key={imageFile._id?.toString()}>
			{isLoading && (
				<>
				<div className="flex items-center justify-center bg-white/50">
					<p className="text-sm text-gray-700">Loading...</p>
				</div>
				</>
			)}

			<CldImage
				src={imageFile.file}
				alt={imageFile.title}
				preserveTransformations
				loading="lazy"
				height={imageFile.height  !== undefined ? Number(imageFile.height) : undefined}
				width={imageFile.width  !== undefined ? Number(imageFile.width) : undefined}
				onLoad={() => setIsLoading(false)}
			/>
		</div>
	);
};

export default ImageBox;
