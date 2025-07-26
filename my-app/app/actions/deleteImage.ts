'use server';

import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import { getServerSession } from 'next-auth';
import Image from '../models/image.model';
import { authOptions } from '../api/auth/[...nextauth]/options';

async function deleteImage(imageId: string) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return { error: 'You need to be signed in to delete an image' };
	}

	try {
		await connectDB();
        console.log('inside delete image');
        
		const imageToDelete = await Image.findById(imageId);

		if (!imageToDelete) throw new Error('Image Not Found');

		// extract public id from image url in DB
		const publicId = imageToDelete.file.split('/');
		const lastPart = publicId.at(-1);
		if (!lastPart) {
			throw new Error('Invalid image file URL');
		}
		const cleanPublicId = lastPart.split('.').at(0);

		// Delete images from Cloudinary
		const deletion = await cloudinary.uploader.destroy('photography/' + cleanPublicId);

		if (deletion.result === 'ok') {
			// Proceed with property deletion
			const res = await Image.deleteOne({ _id: imageId });
			if (res.deletedCount === 1) {
				return { message: `Image ${imageToDelete!.title} deleted`, status: 200 };
			}
		}
	} catch (error) {
		console.error('Error deleting image:', error);
		return { message: (error as Error).message, status: 500 };
	}
}

export default deleteImage;
