'use client';

import { getSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { getAllImages } from '../actions/getAllImages';
import { useImageStore } from '../stores/image.store';
import { getImagesByTag } from '../actions/getImagesByTag';
import ImageBox from '../components/imageBox';

const ImagesFiltered = () => {
	const { id: tag } = useParams();

	const images = useImageStore((store) => store.images);
	const setImages = useImageStore((store) => store.setImages);
	const clearAllImages = useImageStore((store) => store.clearAll);

	useEffect(() => {
		const initiateFilteredPage = async () => {
			clearAllImages();
			//* Getting All Filtered Images
			const data = await getImagesByTag(tag as string);
			if (Array.isArray(data) && data.length > 0) {
				setImages(data);
			}
		};
		initiateFilteredPage();

		// ✅ Cleanup: clear images when this component unmounts
		return () => {
			clearAllImages();
		};
	}, [tag]);

	return (
		<>
			{images.map((image) => (
				<div key={image.file} className="m-4">
					<ImageBox imageFile={image} />
				</div>
			))}
		</>
	);
};

export default ImagesFiltered;
