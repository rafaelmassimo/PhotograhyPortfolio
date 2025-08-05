'use server';

import cloudinary from '@/config/cloudinary';

export const uploadImageToCloudinaryServerSide = async (value: string) => {
	try {
		const uploadedImage = await cloudinary.uploader.upload(value);

        if (uploadedImage.secure_url !== undefined) {
            return {
                file: uploadedImage.secure_url,
                sizes: {
                    height: uploadedImage.height,
                    width: uploadedImage.width
                }

            }
        }
	} catch (error) {
        console.log(error);
        throw new Error('Error uploading image to cloudinary', { cause: error })
    }
};
