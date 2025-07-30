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
		<header className="w-full">
			{/* Navigation Bar */}
			<div className="w-full flex flex-row justify-around mb-[-1rem] items-end">
				<Link href={'/'}>
					<h1 className="text-4xl  clickable-title text-end">
						Rafael Massimo
					</h1>
				</Link>

				<div className="header-nav">
					{session.status === "authenticated" && (
						<div>
							{pathName !== '/addImage' && (
								<Link href={'/addImage'} className="nav-link">
									<button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
										<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
											Add Image
										</span>
									</button>
								</Link>
							)}

							{pathName !== '/manageImages' && (
								<Link href={'/manageImages'} className="nav-link ml-6">
									<button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
										<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
											Manage Images
										</span>
									</button>
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
