'use client';

export const dynamic = 'force-dynamic';

// If I'm going to import all.scss means that I'm applying all styles coming from all .scss file that I'm adding in All.scss
//Now I can use directly the classname coming from all.scss that it will work
// import './styles/all.scss';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import deleteImage from '@/app/actions/deleteImage';
import { getAllImages } from '@/app/actions/getAllImages';
import MasonryGridDelete from '@/app/components/MansoryGridDelete';
import { useImageStore } from '@/app/stores/image.store';
import { useTagStore } from '@/app/stores/tag.store';
import toast from 'react-hot-toast';
import SearchTagInput from '@/app/components/SearchTagInput';

export default function ManageImages() {
	const images = useImageStore((state) => state.images);
	const setImages = useImageStore((state) => state.setImages);
	const deleteImageStore = useImageStore((state) => state.deleImage);
	const setNewTags = useTagStore((state) => state.setTag);
	const removeTag = useTagStore((state) => state.deleTag);

	useEffect(() => {
		const initiateManagePage = async () => {
			//* Getting All Images
			const data = await getAllImages();
			if (Array.isArray(data) && data.length > 0) {
				setImages(data);
				setNewTags(data);
			}
		};
		initiateManagePage();
	}, []);

	

	return (
		<div className="w-full">
				<div className="px-4 ">
					<SearchTagInput/>
					<MasonryGridDelete images={images} />
				</div>
		</div>
	);
}
