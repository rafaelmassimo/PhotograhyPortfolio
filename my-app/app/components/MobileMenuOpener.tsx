'use client'

import Image from 'next/image';
import React from 'react';
import '@/app/styles/all.scss';
import { useMobileMenu } from '../stores/mobileMenu.store';

const MobileMenuOpener = () => {
	const menuOpened = useMobileMenu((state) => state.menuOpened);
	const setMenuOpened = useMobileMenu((state) => state.setOpenOrClose);
	return (
		<>
			{!menuOpened && (
				<button onClick={() => setMenuOpened(!menuOpened)}>
					<span className="block">
						<div className="flex flex-row items-center justify-center bob">
							<Image src={'/logo.png'} alt="fujifilm logo" width={70} height={40} />
							<span className="text-[18px] ml-2 tracking-tight">Dream</span>
						</div>
					</span>
				</button>
			)}
		</>
	);
};

export default MobileMenuOpener;
