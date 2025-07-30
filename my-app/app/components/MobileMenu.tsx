'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTagStore } from '../stores/tag.store';
import { RxHamburgerMenu } from 'react-icons/rx';
import { RiCloseLargeLine } from 'react-icons/ri';
import MobileMenuOpener from './MobileMenuOpener';
import { splitAndCapitalize } from '../utils/functions';

const MobileMenu = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const tags = useTagStore((state) => state.tags);

	const toggleMenu = () => setMenuOpen((prev) => !prev);

	return (
		<div className="block flex items-center justify-center lg:hidden relative z-[9998] w-full h-full">
			{/* Botão Hamburger */}
			<button onClick={toggleMenu} className="p-4 focus:outline-none relative">
				{menuOpen ? (
					<span className="text-3xl font-bold block">
						<RiCloseLargeLine />
					</span>
				) : (
					<span className="block">
						<MobileMenuOpener />
					</span>
				)}
			</button>

			{/* Menu com animação */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="absolute top-full left-1/2 transform -translate-x-1/2 w-64 bg-[rgb(220,220,221)] border border-black shadow-md overflow-hidden rounded-md mt-2 z-[9999]"
					>
						<nav className="flex flex-col gap-4 p-4">
							{tags.map((tag, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.05 }}
								>
									<Link href={`/${tag}`} onClick={() => setMenuOpen(false)}>
										<span className="text-black hover:underline cursor-pointer">
											{splitAndCapitalize(tag)}
										</span>
									</Link>
								</motion.div>
							))}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MobileMenu;
