import AddImageForm from '@/app/components/addImageForm';
import React from 'react';
import '@/app/styles/all.scss'; // Import styles to ensure consistency

export const dynamic = 'force-dynamic';

const AddPhotoPage = () => {
	return (
			<div>
				<AddImageForm />
			</div>
	);
};

export default AddPhotoPage;
