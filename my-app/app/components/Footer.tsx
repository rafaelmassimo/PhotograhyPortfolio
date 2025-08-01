'use client';

import { div } from 'framer-motion/client';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { AiFillFire } from 'react-icons/ai';

const Footer = () => {
	const currentYear = new Date().getFullYear();
	const session = useSession();
	console.log(session);

	return (
		<footer className="border-t border-gray-200 mt-16 py-8 relative">
			<div className="px-4 ml-4">
				<div className="flex flex-col items-start justify-start space-y-4">
					{/* Nome/Copyright */}
					<div className="text-left">
						<p className="text-gray-600 text-sm">
							© {currentYear} Rafael Massimo. All rights reserved.
						</p>
					</div>

					{/* Link do Instagram */}
					<div className="flex items-center space-x-2">
						<span className="text-gray-600 text-sm">Follow me on Instagram:</span>
						<a
							href="https://www.instagram.com/setteframes" // Substitua pelo seu username
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-all duration-200"
							aria-label="Instagram"
						>
							{/* Ícone do Instagram SVG moderno */}
							<svg
								className="w-4 h-4"
								fill="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</a>
					</div>
				</div>
			</div>
			{session.status === 'authenticated' && (
				<div className="ml-6">
					<button
						onClick={() => signOut()}>
							Sign Out
					</button>
				</div>
			)}

			{session.status === 'unauthenticated' && (
				<AiFillFire className="absolute text-slate-100 bottom-4 right-4" onClick={() => signIn()} />
			)}
		</footer>
	);
};

export default Footer;
