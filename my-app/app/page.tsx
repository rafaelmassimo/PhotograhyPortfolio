'use client';

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
			const data = await getAllImages();
			if(Array.isArray(data) && data.length > 0) {
				setImages(data);
			}
		};
		initiateHomePage();
	}, []);

	return (
		<div>
			hello homepage
			{
				images.map((image) => (
					<ImageBox key={image.id?.toString()} {...image} />
				))
			}
		</div>
	);
}
