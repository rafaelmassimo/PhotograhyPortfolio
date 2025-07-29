'use client';

import React from 'react';
import Masonry from 'react-masonry-css';
import { ImageType } from '../models/image.model';

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
