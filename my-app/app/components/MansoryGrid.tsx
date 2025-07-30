'use client';

import React from 'react';
import Masonry from 'react-masonry-css';
import { ImageType } from '../models/image.model';
import Image from 'next/image';

import '../styles/all.scss';
import { ImageBox } from './imageBox';

const breakpointColumnsObj = {
	default: 3,
	1100: 3,
	700: 2,
	500: 1,
};

interface MasonryGridProps {
	images: ImageType[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ images }) => {
	if (images.length === 0) {
		return (
			<div className='flex flex-col justify-start items-center'>
				<Image
					src="/sofy.png"
					alt="sofy"
					width={800}
					height={600}
				
				/>
				<span className='text-4xl'>No Images</span>
			</div>
		);
	}
	return (
		<Masonry
			breakpointCols={breakpointColumnsObj}
			className="my-masonry-grid"
			columnClassName="my-masonry-grid_column"
		>
			{images.map((image) => (
				<div key={image._id?.toString()} className="masonry-item">
					<ImageBox imageFile={image} />
				</div>
			))}
		</Masonry>
	);
};

export default MasonryGrid;
