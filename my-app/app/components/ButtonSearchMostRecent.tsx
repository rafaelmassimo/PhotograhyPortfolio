import React from 'react';
import { getMostRecentImages } from '../actions/getMostRecentFiles';
import { useImageStore } from '../stores/image.store';

const ButtonSearchMostRecent = () => {
	const setMostRecentImages = useImageStore((state) => state.setImages);

	const handleClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			const res = await getMostRecentImages();
			setMostRecentImages(res);
		} catch (error) {
			console.error('Error fetching recent images:', error);
		}
	};

	return (
		<div>
			<button
				className="btn btn-accent recentImagesButton"
				type="button" // Changed from "submit" to "button"
				onClick={handleClick}
			>
				Most Recently Added
			</button>
		</div>
	);
};

export default ButtonSearchMostRecent;
