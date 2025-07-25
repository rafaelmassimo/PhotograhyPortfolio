import React from 'react';
import { ImageType } from '../models/image.model';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';

const ImageBox = (imageFile: ImageType) => {
	return (
		<>
			<div>
				<Image src={imageFile.file} alt={imageFile.title} height={400} width={400} />
			</div>

			<div>
				<CldImage
					src={imageFile.file}
					width={1920}
                    height={1080}
					crop="limit"
					quality="auto:eco"
					loading="lazy"
					alt="Portfolio image"
				/>
			</div>
		</>
	);
};

export default ImageBox;
