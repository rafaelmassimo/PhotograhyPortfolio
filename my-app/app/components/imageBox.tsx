import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import { ImageType } from '../models/image.model';
import { useFullScreenImage } from '../stores/fullScreenImage.store';

export const ImageBox = ({
	imageFile,
	onClick,
}: {
	imageFile: ImageType;
	onClick?: () => void;
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const setUrl = useFullScreenImage((state) => state.setFullScreenImage);

	return (
		<div className="image-container cursor-pointer" onClick={onClick}>
			{isLoading && (
				<div className="flex items-center justify-center bg-white/50">
					<p className="text-sm text-gray-700">Loading...</p>
				</div>
			)}
			<CldImage
				src={imageFile.file}
				alt={imageFile.title}
				preserveTransformations
				height={Number(imageFile.height)}
				width={Number(imageFile.width)}
				onLoad={() => setIsLoading(false)}
				className="w-full h-auto"
				onClick={() => setUrl(imageFile.file)}
			/>
		</div>
	);
};
