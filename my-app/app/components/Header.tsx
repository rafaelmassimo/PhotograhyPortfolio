'use client';

import React from 'react';
import Link from 'next/link';
import TagSelector from './tagSelector';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

const Header = () => {
	const session = useSession();
	const pathName = usePathname();

	return (
		<header className="w-full flex flex-row items-center justify-between relative">
			{/* Navigation Bar */}
			<div className="w-full flex flex-row justify-between mx-4 py-4">
				<Link href={'/'}>
					<h1 className="text-4xl font-bold clickable-title mr-2">Rafael Massimo</h1>
				</Link>

				<div className="flex flex-row items-center space-x-4">
					{session !== undefined && (
						<div>
							{pathName !== '/addImage' && (
								<Link
									href={'/addImage'}
									className="text-sm text-gray-600 hover:text-black transition-colors duration-200 border border-black p-2 mx-2"
								>
									Add Image
								</Link>
							)}

							{pathName !== '/manageImages' && (
								<Link
									href={'/manageImages'}
									className="text-sm text-gray-600 hover:text-black transition-colors duration-200 border border-black p-2"
								>
									Manage Images
								</Link>
							)}
						</div>
					)}
				</div>
				{/* Tag Selector */}
				<div className="hidden lg:block">
					<TagSelector />
				</div>
			</div>
		</header>
	);
};

export default Header;
