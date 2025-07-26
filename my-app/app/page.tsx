'use client';

// If I'm going to import all.scss means that I'm applying all styles coming from all .scss file that I'm adding in All.scss
//Now I can use directly the classname coming from all.scss that it will work
import './styles/all.scss'

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useImageStore } from './stores/image.store';
import { getAllImages } from './actions/getAllImages';
import ImageBox from './components/imageBox';

export default function Home() {
	const [session, setSession] = useState<Session | null>(null);

	const images = useImageStore((state) => state.images);
	const setImages = useImageStore((state) => state.setImages);

	useEffect(() => {
		const initiateHomePage = async () => {
			// Getting Session Data
			const sess = await getSession();
			setSession(sess);

			// Getting All Images
			// const data = await getAllImages();
			// if(Array.isArray(data) && data.length > 0) {
			// 	setImages(data);
			// }
		};
		initiateHomePage();
	}, []);

	return (
		<div className='hero'>
			hello homepage
			{
				images.map((image) => (
					<div key={image.file}>

					<ImageBox  imageFile={image} />
					</div>
				))
			}
		</div>
	);
}
