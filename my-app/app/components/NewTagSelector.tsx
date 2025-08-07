import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTagStore } from '../stores/tag.store';
import { splitAndCapitalize } from '../utils/functions';
import { getAllTags } from '../actions/getAllTags';

const NewTagSelector = () => {
	const setNewTagsByTags = useTagStore((state) => state.setAddNewTag);
	const tags = useTagStore((state) => state.tags);
	const clearAll = useTagStore((state) => state.clearAll);

	useEffect(() => {
		const loadTags = async () => {
				clearAll();
				const allTags = await getAllTags();				
				if (allTags) {
					setNewTagsByTags(allTags);
				}
		};
		loadTags();
	}, []);

	return (
		<nav className="tag-selector-desktop">
			{tags.map((tag, i) => (
				<Link key={i} href={`/${tag}`}>
					<span className="text-black hover:underline cursor-pointer">
						{splitAndCapitalize(tag)}
					</span>
				</Link>
			))}
			<Link href={`/getInTouch`}>
					<span className="text-sky-800 hover:underline cursor-pointer">
						Contact
					</span>
				</Link>
		</nav>
	);
};

export default NewTagSelector;
