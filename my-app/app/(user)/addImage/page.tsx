import AddImageForm from '@/app/components/addImageForm';
import Link from 'next/link';
import React from 'react';
import '@/app/styles/all.scss'; // Import styles to ensure consistency

export const dynamic = 'force-dynamic';

const AddPhotoPage = () => {
	return (
		<div>
			<div>
				<AddImageForm />
			</div>
		</div>
	);
};

export default AddPhotoPage;
