'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTagStore } from '../stores/tag.store';
import { RxHamburgerMenu } from 'react-icons/rx';
import { RiCloseLargeLine } from 'react-icons/ri';
import MobileMenuOpener from './MobileMenuOpener';
import { splitAndCapitalize } from '../utils/functions';
import { useMobileMenu } from '../stores/mobileMenu.store';
import '@/app/styles/all.scss';

const MobileMenuUpdated = () => {
	const menuOpened = useMobileMenu((state) => state.menuOpened);
	const setMenuOpened = useMobileMenu((state) => state.setOpenOrClose);

	const tags = useTagStore((state) => state.tags);

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<div className={`dropdown ${menuOpened ? 'dropdownOpened' : ''}`}>
					<button onClick={() => setMenuOpened(false)}>
						<span className="text-3xl font-bold ">
							<RiCloseLargeLine className={`iconStyles mt-2 ${menuOpened ? 'iconOpening' : 'iconClosing'}`} />
						</span>
					</button>
					{tags.map((tag) => (
						<Link href={`/${tag}`} className="my-2 p-2" onClick={() => setMenuOpened(false)}>
							<span className="text-black hover:underline cursor-pointer">
								{splitAndCapitalize(tag)}
							</span>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default MobileMenuUpdated;
