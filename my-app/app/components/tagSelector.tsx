import React from 'react';
import { useImageStore } from '../stores/image.store';
import Link from 'next/link';
import { useTagStore } from '../stores/tag.store';
import { splitAndCapitalize } from '../utils/functions';

const TagSelector = () => {
	const tags = useTagStore((state) => state.tags);

	return (
			<nav className='tag-selector-desktop'>
				{tags.map((tag, i) => (
					<Link key={i} href={`/${tag}`}>
						<span className="text-black hover:underline cursor-pointer">
							{splitAndCapitalize(tag)}
						</span>
					</Link>
				))}
			</nav>
	);
};

export default TagSelector;
