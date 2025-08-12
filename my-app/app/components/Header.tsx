'use client';

import React from 'react';
import Link from 'next/link';
import NavUserLinks from './NavUserLinks';
import NewTagSelector from './NewTagSelector';
import { LuArrowBigLeft } from 'react-icons/lu';

const Header = () => {
	return (
		<>
			<div className="absolute z-100 top-0 left-2 mt-2">
				<Link href={'/'} className="flex flex-row justify-center items-center backToHome">
					<LuArrowBigLeft className="mb-0.5 mr-0.5" />
					<span>Back To Home</span>
				</Link>
			</div>

			<header className="w-full">
				{/* Navigation Bar */}
				<div className="top-header-style">
					<Link href={'/gallery'} className="clickable-title">
						Gallery
					</Link>
					{/* Just when the user is logged in */}
					<NavUserLinks />

					{/* Are the link/Tag on the header */}
					<NewTagSelector />
				</div>
			</header>
		</>
	);
};

export default Header;
