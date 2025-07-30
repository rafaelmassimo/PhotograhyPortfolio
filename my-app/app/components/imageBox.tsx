import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import { ImageType } from '../models/image.model';
import { useFullScreenImage } from '../stores/fullScreenImage.store';
import LoadingImages from './LoadingImages';

export const ImageBox = ({
	imageFile,
	onClick,
}: {
	imageFile: ImageType;
	onClick?: () => void;
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAnimating, setIsAnimating] = useState(false);
	const setUrl = useFullScreenImage((state) => state.setFullScreenImage);

	const handleImageClick = () => {
		// Start the animation
		setIsAnimating(true);

		// After animation completes, show full screen image
		setTimeout(() => {
			setUrl(imageFile.file);
			setIsAnimating(false);
		}, 500); // 400ms matches the animation duration

		// Call the optional onClick prop if provided
		if (onClick) {
			onClick();
		}
	};

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
		<div
			className={`image-container cursor-pointer ${isAnimating ? 'image-click-animation' : ''}`}
			onClick={handleImageClick}
		>
			{isLoading && <LoadingImages />}
			<CldImage
				src={imageFile.file}
				alt={imageFile.title}
				preserveTransformations
				height={Number(imageFile.height)}
				width={Number(imageFile.width)}
				onLoad={() => setIsLoading(false)}
				onContextMenu={handleContextMenu}
				onDragStart={handleDragStart}
				className="w-full h-auto select-none"
				draggable={false}
			/>
		</div>
	);
};
