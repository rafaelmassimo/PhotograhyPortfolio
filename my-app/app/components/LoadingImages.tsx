import React from 'react';
import { PacmanLoader, PuffLoader } from 'react-spinners';

interface LoadingImagesProps {
	color?: string;
}

const LoadingImages: React.FC<LoadingImagesProps> = ({ color }) => {
	return (
		<div className="flex h-[300px] p-10 items-center justify-center">
			<PuffLoader color={color ?? "#020103"} size={120} speedMultiplier={2} />
		</div>
	);
};

export default LoadingImages;
