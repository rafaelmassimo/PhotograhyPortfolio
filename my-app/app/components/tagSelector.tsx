import React from 'react';
import { useImageStore } from '../stores/image.store';
import Link from 'next/link';

const TagSelector = () => {
	const state = useImageStore((state) => state.images);
	const tags: string[] = [];

	state.map((image) => {
		if (!tags.includes(image.tag)) {
			tags.push(image.tag);
		}
	});

	return (
		<>
			<div className="flex flex-row justify-between m-4 p-4 ">
				<nav className="flex gap-4">
					{tags.map((tag, i) => (
						<Link key={i} href={`/${tag}`}>
							<span className="text-link hover:text-link-hover" key={i}>
								{tag}
							</span>
						</Link>
					))}
				</nav>
			</div>
		</>
	);
};

export default TagSelector;
