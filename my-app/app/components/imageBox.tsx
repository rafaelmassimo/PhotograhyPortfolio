'use client'

import React, { useState } from 'react';
import { ImageType } from '../models/image.model';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';


const ImageBox = ({ imageFile }: { imageFile: ImageType }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<>
			<div className='' key={imageFile._id?.toString()}>
				<CldImage
					src={imageFile.file}
					alt={imageFile.title}
					width={100}
					height={100}
					preserveTransformations
				/>
			</div>
		</>
	);
};

export default ImageBox;

{
	/* <div key={imageFile._id?.toString()}>
				<Image src={imageFile.file} alt={imageFile.title} height={400} width={400} />
			</div> */
}

// 		<Image
//   src={photoUrl}
//   alt="Picture of the author"
//   sizes="100vw"
//   style={{
//     width: '100%',
//     height: 'auto',
//   }}
//   width={500}
//   height={300}
// />
