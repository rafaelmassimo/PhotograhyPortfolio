import React from 'react';
import { useImageStore } from '../stores/image.store';
import Link from 'next/link';
import { useTagStore } from '../stores/tag.store';
import { splitAndCapitalize } from '../utils/functions';

const TagSelector = () => {
	const tags = useTagStore((state) => state.tags);

	return (
		<header className="hidden lg:block w-full  flex flex-row justify-end sticky top-0 z-40">
			<div className="max-w-7xl mx-auto px-4 py-4">
				<nav className="flex flex-row gap-6">
					{tags.map((tag, i) => (
						<Link key={i} href={`/${tag}`}>
							<span className="text-black hover:underline cursor-pointer">{splitAndCapitalize(tag)}</span>
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
};

export default TagSelector;
