import AddImageForm from '@/app/components/addImageForm';
import React from 'react';

const AddPhotoPage = () => {
	return (
        <div>
            Add image
            <div>
                <AddImageForm/>
            </div>
        </div>
    );
};

export default AddPhotoPage;

// import { CldImage } from 'next-cloudinary';

{
	/* <CldImage
  src="your-cloudinary-public-id"
  width={1920}
  crop="limit"
  quality="auto:eco"
  loading="lazy"
  alt="Portfolio image"
/> */
}
