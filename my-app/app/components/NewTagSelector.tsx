import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTagStore } from '../stores/tag.store';
import { splitAndCapitalize } from '../utils/functions';
import { getAllTags } from '../actions/getAllTags';

const NewTagSelector = () => {
	const setNewTagsByTags = useTagStore((state) => state.setTagByTags);
	const tags = useTagStore((state) => state.tags);

	useEffect(() => {
		const updateImagesData = async () => {
			if (tags.length === 0) {
				const allTags = await getAllTags();

				if (allTags) {
					setNewTagsByTags(allTags);
				}
			}
		};
		updateImagesData();
	}, []);

	return (
		<nav className="tag-selector-desktop">
			{tags.map((tag, i) => (
				<Link key={i} href={`/${tag}`}>
					<span key={i} className="text-black hover:underline cursor-pointer">
						{splitAndCapitalize(tag)}
					</span>
				</Link>
			))}
		</nav>
	);
};

export default NewTagSelector;
