'use client';

// If I'm going to import all.scss means that I'm applying all styles coming from all .scss file that I'm adding in All.scss
//Now I can use directly the classname coming from all.scss that it will work
// import './styles/all.scss';

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import ImageBox from '@/app/components/imageBox';
import { useImageStore } from '@/app/stores/image.store';
import { getAllImages } from '@/app/actions/getAllImages';
import deleteImage from '@/app/actions/deleteImage';

export default function ManageImages() {
	const [session, setSession] = useState<Session | null>(null);

	const images = useImageStore((state) => state.images);
	const setImages = useImageStore((state) => state.setImages);
	const deleteImageStore = useImageStore((state) => state.deleImage)

	useEffect(() => {
		const initiateManagePage = async () => {
			//* Getting Session Data
			const sess = await getSession();
			setSession(sess);

			//* Getting All Images
			const data = await getAllImages();
			if (Array.isArray(data) && data.length > 0) {
				setImages(data);
			}
		};
		initiateManagePage();
	}, []);

    const handleDeleteImage = async (imageId: string) => {
        const res = await deleteImage(imageId);
        if(res?.status === 200) {
            alert(res.message)

			//* Remove this image from store
			deleteImageStore(imageId)
        } else {
            alert(res?.error)
        }

    }

	return (
		<div className='flex flex-row m-4'>

		<div className="hero flex flex-row m-4">
			hello homepage
			{images.map((image) => (
				<div key={image.file} className='m-4'>
					<ImageBox imageFile={image} />
					<button onClick={() => handleDeleteImage(image._id!.toString())} className="btn btn-error">Delete This Image</button>
				</div>
			))}
		</div>
			</div>
	);
}
