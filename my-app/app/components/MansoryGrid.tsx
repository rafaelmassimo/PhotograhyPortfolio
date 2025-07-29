'use client';

import React from 'react';
import Masonry from 'react-masonry-css';
import { ImageType } from '../models/image.model';
import ImageBox from './imageBox';
import '../styles/all.scss'

const breakpointColumnsObj = {
	default: 4,
	1100: 3,
	700: 2,
	500: 1,
};

const MasonryGrid = ({ images }: { images: ImageType[] }) => {
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
