'use client';

import React, { useEffect } from 'react';
import { useFullScreenImage } from '../stores/fullScreenImage.store';

const FullScreenImageViewer = () => {
	const fullScreenImage = useFullScreenImage((state) => state.FullScreenImage);
	const deleteUrl = useFullScreenImage((state) => state.clearAll);

	useEffect(() => {
		// Impede scroll de fundo enquanto o modal está aberto
		document.body.style.overflow = 'hidden';

		// Push a new state to the history stack so back button closes modal
		window.history.pushState({ fullScreenImage: true }, '');

		const handleBeforeUnload = () => {
			deleteUrl();
		};

		const handlePopState = (event: PopStateEvent) => {
			// Only close modal if the state we pushed is present
			if (window.history.state && window.history.state.fullScreenImage) {
				deleteUrl();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				deleteUrl();
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		window.addEventListener('popstate', handlePopState);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.style.overflow = 'auto';
			window.removeEventListener('beforeunload', handleBeforeUnload);
			window.removeEventListener('popstate', handlePopState);
			window.removeEventListener('keydown', handleKeyDown);
			// When closing modal, go forward in history if the state we pushed is present
			if (window.history.state && window.history.state.fullScreenImage) {
				window.history.go(1);
			}
		};
	}, [deleteUrl]);

	// Previne clique direito para evitar download da imagem
	const handleContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		return false;
	};

	// Previne drag and drop da imagem
	const handleDragStart = (e: React.DragEvent) => {
		e.preventDefault();
		return false;
	};

	return (
		<div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
			<button
				onClick={deleteUrl}
				className="absolute top-5 right-5 text-white text-3xl font-bold z-50 cursor-pointer transition-all duration-200 hover:text-red-600"
				aria-label="Close full screen viewer"
			>
				✕
			</button>

			<img
				src={fullScreenImage}
				className="max-w-full max-h-full object-contain fullscreen-image-fade-in select-none"
				onContextMenu={handleContextMenu}
				onDragStart={handleDragStart}
				draggable={false}
			/>
		</div>
	);
};

export default FullScreenImageViewer;
