import React from 'react';
import { useImageStore } from '../stores/image.store';
import Link from 'next/link';
import { useTagStore } from '../stores/tag.store';
import { splitAndCapitalize } from '../utils/functions';

const TagSelector = () => {
	const tags = useTagStore((state) => state.tags);

	return (
		<div className="hidden lg:flex w-full flex-row items-end justify-end ml-4">
			<div className="max-w-7xl flex items-end">
				<nav className="flex flex-row items-end gap-6">
					{tags.map((tag, i) => (
						<Link key={i} href={`/${tag}`}>
							<span className="text-black hover:underline cursor-pointer">
								{splitAndCapitalize(tag)}
							</span>
						</Link>
					))}
				</nav>
			</div>
		</div>
	);
};

export default TagSelector;
