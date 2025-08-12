'use client';

import React from 'react';
import Link from 'next/link';
import { useTagStore } from '../stores/tag.store';
import { RiCloseLargeLine } from 'react-icons/ri';
import { splitAndCapitalize } from '../utils/functions';
import { useMobileMenu } from '../stores/mobileMenu.store';
import '@/app/styles/all.scss';

const HomeMobileMenu = () => {
	const menuOpened = useMobileMenu((state) => state.menuOpened);
	const setMenuOpened = useMobileMenu((state) => state.setOpenOrClose);

	return (
		<>
			<div className="flex flex-col items-center justify-center ">
				<div className={`dropdown ${menuOpened ? 'dropdownOpened' : ''}`}>
					<button onClick={() => setMenuOpened(false)}>
						<span className="text-3xl font-bold ">
							<RiCloseLargeLine
								className={`iconStyles mt-2 ${menuOpened ? 'iconOpening' : 'iconClosing'}`}
							/>
						</span>
					</button>

					<Link href={`/gallery`} className="my-2 p-2" onClick={() => setMenuOpened(false)}>
						<span className="text-black hover:underline cursor-pointer">Go to My Gallery</span>
					</Link>

					<div className="split-line"></div>
					<Link className="mb-2" href={`/getInTouch`} onClick={() => setMenuOpened(false)}>
						<span className="text-sky-800 hover:underline cursor-pointer">Contact</span>
					</Link>
				</div>
			</div>
		</>
	);
};

export default HomeMobileMenu;
