'use client';

export const dynamic = 'force-dynamic';

// If I'm going to import all.scss means that I'm applying all styles coming from all .scss file that I'm adding in All.scss
//Now I can use directly the classname coming from all.scss that it will work
// import './styles/all.scss';
import { useEffect } from 'react';
import { getAllImages } from '@/app/actions/getAllImages';
import MasonryGridDelete from '@/app/components/MansoryGridDelete';
import { useImageStore } from '@/app/stores/image.store';
import { useTagStore } from '@/app/stores/tag.store';
import SearchTagInput from '@/app/components/SearchTagInput';

export default function ManageImages() {
	const images = useImageStore((state) => state.images);
	const setImages = useImageStore((state) => state.setImages);
	const setNewTags = useTagStore((state) => state.setTags);

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
		<div className="w-full min-h-screen flex flex-col">
			<div className="flex-1">
				<div className="px-4">
					<SearchTagInput />
					<MasonryGridDelete images={images} />
				</div>
			</div>
		</div>
	);
}
