'use server';

import Image, { ImageType } from './../models/image.model';
import connectDB from '@/config/database';
import cloudinary from '@/config/cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import User from '../models/user.model';
import { ObjectId } from 'mongoose';

// export type NewImageType = {
// 	owner: ObjectId | string;
// 	title: string;
// 	tag: string;
// 	file: string;
// 	location?: string;
// };

export async function addImage(imageData: ImageType) {

	if(!imageData.title || !imageData.tag || !imageData.file) return {error: 'Missing required field(s)', status: 501}

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
		// Upload the images to Cloudinary
		// Upload a single image to Cloudinary

		const uploadedImage = await cloudinary.uploader.upload(imageData.file);

		//>> VERSION WHERE I CAN CHOOSE THE SIZES
		// const uploadedImage = await cloudinary.uploader.upload(imageData.file, {
		// 	transformation: [
		// 		{
		// 			width: 1920, // Max display size
		// 			height: 1080,
		// 			crop: 'limit', // Resize but don’t upscale
		// 			quality: 'auto:eco', // Smart compression
		// 			fetch_format: 'auto', // Use WebP/AVIF when supported
		// 		},
		// 	],
		// });

		// Get the secure URL
		const imageUrl = uploadedImage.secure_url;

		console.log('Connecting to database');
		await connectDB();

		const user = await User.findOne({ email: session.user.email });
		if (!user) {
			return { error: 'User not authorized', code: 401 };

		}
		
		const newImage = new Image({
			owner: user._id,
			title: imageData.title,
			tag: upperCaseTag(imageData.tag),
			file: imageUrl,
		});

		const res = await newImage.save(); //* Save the new image

		if (res) {
			return { success: 'Image added successfully', path: imageUrl };
		}
	} catch (error) {
		console.error('Error adding image:', error);
		return { error: 'Error adding image' };
	}
}
