'use client';

import React from 'react';
import { useFullScreenImage } from '../stores/fullScreenImage.store';

const FullScreenImageViewer = () => {
	const fullScreenImage = useFullScreenImage((state) => state.FullScreenImage);
	const deleteUrl = useFullScreenImage((state) => state.clearAll);

	// Impede scroll de fundo enquanto o modal está aberto
	React.useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
			<button
				onClick={deleteUrl}
				className="absolute top-5 right-5 text-white text-3xl font-bold z-50 cursor-pointer transition-all duration-200 hover:text-red-600"
				aria-label="Close full screen viewer"
			>
				✕
			</button>

			<img src={fullScreenImage} className="max-w-full max-h-full object-contain" />
		</div>
	);
};

export default FullScreenImageViewer;
