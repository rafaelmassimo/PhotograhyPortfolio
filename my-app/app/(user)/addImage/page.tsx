import AddImageForm from '@/app/components/addImageForm';
import Link from 'next/link';
import React from 'react';

const AddPhotoPage = () => {
	return (
		<div>
			<Link href={'/'}>home</Link>
			Add image
			<div>
				<AddImageForm />
			</div>
		</div>
	);
};

export default AddPhotoPage;
