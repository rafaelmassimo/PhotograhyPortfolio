import React, { useState } from 'react';
import { getImagesByTag } from '../actions/getImagesByTag';
import { useImageStore } from '../stores/image.store';
import ButtonSearchMostRecent from './ButtonSearchMostRecent';

const SearchTagInput = () => {
	const [tagToSearch, setTagToSearch] = useState<string>('');
	const setImagesSearched = useImageStore((state) => state.setImages);

	const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setTagToSearch(e.target.value);

		if (tagToSearch.length >= 2) {
			const res = await getImagesByTag(tagToSearch);
			setImagesSearched(res);
		}
	};

	return (
		<div className="flex flex-row items-baseline justify-center h-20">
			<div>
				<fieldset className="fieldset">
					<legend className="fieldset-legend text-black">Insert the Tag To Search</legend>
					<input
						type="text"
						name="search"
						value={tagToSearch}
						className="input input-bordered !bg-white text-black"
						placeholder="Type here"
						onChange={handleInputChange}
					/>
				</fieldset>
			</div>
			<div className='ml-2'>
				<ButtonSearchMostRecent />
			</div>
		</div>
	);
};

export default SearchTagInput;
