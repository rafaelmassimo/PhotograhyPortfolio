import Image from 'next/image';
import React from 'react';
import '@/app/styles/all.scss'

const MobileMenuOpener = () => {
	return (
		<div className='flex flex-row items-center justify-center bob'>
			<Image src={'/logo.png'} alt="fujifilm logo" width={70} height={40} />
            <span className='text-[18px] ml-2 tracking-tight'>Stories</span>
		</div>
	);
};

export default MobileMenuOpener;
