import React from 'react';
import { useMobileMenu } from '../stores/mobileMenu.store';
import { RxHamburgerMenu } from 'react-icons/rx';

const HamburgerMenuOpener = () => {
	const menuOpened = useMobileMenu((state) => state.menuOpened);
	const setMenuOpened = useMobileMenu((state) => state.setOpenOrClose);
	return (
		<>
			{!menuOpened && (
				<button onClick={() => setMenuOpened(!menuOpened)}>
					<span className="block">
						<div className="flex flex-row items-center justify-center">
							<RxHamburgerMenu className='text-4xl mt-4 hamburgerIcon' />
						</div>
					</span>
				</button>
			)}
		</>
	);
};

export default HamburgerMenuOpener;
