'use client';

import React from 'react';
import Link from 'next/link';
import NavUserLinks from './NavUserLinks';
import TagSelector from './TagSelector';


const Header = () => {
	return (
		<header className="w-full">
			{/* Navigation Bar */}
			<div className="top-header-style">
				<Link href={'/'} className="clickable-title">
					Rafael Massimo
				</Link>

				<NavUserLinks />

				<TagSelector />
			</div>
		</header>
	);
};

export default Header;
