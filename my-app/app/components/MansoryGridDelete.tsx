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
	deleteImage: (id: string, tag: string) => void;
}
const MasonryGridDelete: React.FC<MasonryGridProps> = ({ images, deleteImage }) => {
	return (
		<Masonry
			breakpointCols={breakpointColumnsObj}
			className="my-masonry-grid"
			columnClassName="my-masonry-grid_column"
		>
			{images.map((image) => (
				<div key={image._id?.toString()} className="masonry-item">
					<ImageBox imageFile={image} />
					<button
						onClick={() => deleteImage(image._id!.toString(), image.tag)}
						className="btn btn-error"
					>
						Delete
					</button>
                    <br />
                    <span>
						Title: {image.title}
					</span>
                    <br />
					<span>
						Tag: {image.tag}
					</span>
				</div>
			))}
		</Masonry>
	);
};

export default MasonryGridDelete;
