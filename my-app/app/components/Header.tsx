'use client';

import React from 'react';
import Link from 'next/link';
import NavUserLinks from './NavUserLinks';
import NewTagSelector from './NewTagSelector';

const Header = () => {
	
	return (
		<header className="w-full">
			{/* Navigation Bar */}
			<div className="top-header-style">
				<Link href={'/gallery'} className="clickable-title">
					Rafael Massimo
				</Link>

				{/* Just when the user is logged in */}
				<NavUserLinks />
				
				{/* Are the link/Tag on the header */}
				<NewTagSelector />
			</div>
		</header>
	);
};

export default Header;
