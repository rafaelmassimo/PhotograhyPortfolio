'use client';

import React from 'react';
import Link from 'next/link';
import TagSelector from './tagSelector';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import NavUserLinks from './NavUserLinks';

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
