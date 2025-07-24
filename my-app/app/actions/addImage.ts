'use server';

import connectDB from '@/config/database';
import cloudinary from '@/config/cloudinary';
import { getServerSession } from 'next-auth';
import Image, { imageType } from '../models/image.model';
import { authOptions } from '../api/auth/[...nextauth]/options';
import User from '../models/user.model';

export async function addImage(imageData: imageType) {
	const upperCaseTag = (sentence: string) =>
		sentence
			.split(' ')
			.map((word) => word[0].toUpperCase() + word.slice(1))
			.join(' ');

	const session = await getServerSession(authOptions);

	if (!session) {
		return { error: 'You need to be signed in to add an image' };
	}

	try {
		const user = await User.findOne({ email: session.user.email });

		// Upload the images to Cloudinary
		// Upload a single image to Cloudinary
		const uploadedImage = await cloudinary.uploader.upload(imageData.file, {
			transformation: [
				{
					width: 1920, // Max display size
                    height: 1080,
					crop: 'limit', // Resize but don’t upscale
					quality: 'auto:eco', // Smart compression
					fetch_format: 'auto', // Use WebP/AVIF when supported
				},
			],
		});

		// Get the secure URL
		const imageUrl = uploadedImage.secure_url;

		const newImage = new Image({
			owner: user?._id,
			imageTitle: imageData.title,
			imageTag: upperCaseTag(imageData.tag),
			file: imageUrl,
		});

		console.log('Connecting to database');

		await connectDB();

		const res = await newImage.save(); //* Save the new image

		if (res) {
			return { success: 'Image added successfully' };
		}
	} catch (error) {
		console.error('Error adding image:', error);
		return { error: 'Error adding image' };
	}
}
