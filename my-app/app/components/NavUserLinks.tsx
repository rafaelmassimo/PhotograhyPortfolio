'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IoAddCircleSharp } from 'react-icons/io5';
import { MdNoPhotography } from 'react-icons/md';

const NavUserLinks = () => {
	const session = useSession();
	const pathName = usePathname();
	return (
		<div className="header-nav">
			{session.status === 'authenticated' && (
				<>
					{pathName !== '/addImage' && (
						<Link href={'/addImage'}>
							<IoAddCircleSharp className='nav-icon-green'/>
						</Link>
					)}

					{pathName !== '/manageImages' && (
						<Link href={'/manageImages'}>
							<MdNoPhotography className="nav-icon-red" />
						</Link>
					)}
				</>
			)}
		</div>
	);
};

export default NavUserLinks;
