import React from 'react';
import { PacmanLoader, PuffLoader } from 'react-spinners';

const LoadingImages = () => {
	return (
		<div className="flex h-[300px] p-10 items-center justify-center">
			<PuffLoader color="#3c1cd7" size={120} speedMultiplier={2} />
		</div>
	);
};

export default LoadingImages;
