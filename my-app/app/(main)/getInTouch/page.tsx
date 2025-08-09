'use client';

import React from 'react';
import Image from 'next/image';
import '../../styles/all.scss'; // Import styles
import Link from 'next/link';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import ContactForm from '@/app/components/ContactForm';

const GetInTouchPage = () => {
	return (
		<>
			<Link href={'/'}>
				<div className="badge badge-accent ml-4 mb-2 budge-style">
					{' '}
					<IoReturnDownBackOutline />
					Back To Home{' '}
				</div>
			</Link>
			<div className="lg:grid grid-cols-2 justify-center items-center mx-4 mobile-view">
				<div className="flex justify-center items-center h-full">
					<div className="image-form">
						<Image
							src={'/Photo-3.jpg'}
							alt="my image"
							width={1000}
							height={1000}
							className="triangle-left object-cover"
						/>
					</div>
				</div>
				<div>
					<ContactForm />
				</div>
			</div>
		</>
	);
};

export default GetInTouchPage;
