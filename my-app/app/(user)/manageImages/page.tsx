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

export default function ManageImages() {
	const [session, setSession] = useState<Session | null>(null);

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

	const handleDeleteImage = async (imageId: string, imageTag: string) => {
		const res = await deleteImage(imageId);
		if (res?.status === 200) {
			//* Remove this image from store
			deleteImageStore(imageId);
			removeTag(imageTag);
			toast.success('Image deleted');
		} else {
			alert(res?.error);
		}
	};

	return (
		<div className=" m-4">
			<div className="hero flex flex-row m-4">
				<div className="px-4">
					<MasonryGridDelete deleteImage={handleDeleteImage} images={images} />
				</div>
			</div>
		</div>
	);
}
