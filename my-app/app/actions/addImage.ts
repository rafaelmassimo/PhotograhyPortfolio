'use server';

import Image, { ImageType } from './../models/image.model';
import connectDB from '@/config/database';
import cloudinary from '@/config/cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import User from '../models/user.model';

export async function addImage(imageData: ImageType[]) {

	const toPascalCase = (sentence: string) => {
		return sentence
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join('');
	};

	const session = await getServerSession(authOptions);

	if (!session) {
		return { error: 'You need to be signed in to add an image' };
	}

	console.log('Connecting to database');
	await connectDB();

	const user = await User.findOne({ email: session.user.email });
	if (!user) {
		return { error: 'User not authorized', code: 401 };
	}

	try {
		// Upload the images to Cloudinary
		const allImagesData: InstanceType<typeof Image>[] = [];
		for (const image of imageData) {
			
			//* CREATING NEW IMAGES (MONGOOSE OBJECTS) AND SAVING INSIDE AN ARRAY
			const newImage = new Image({
				owner: user._id,
				title: image.title,
				tag: toPascalCase(image.tag),
				file: image.file,
				height: image.height,
				width: image.width,
			});

			allImagesData.push(newImage);
		}

		const res = await Promise.all(allImagesData.map(imageObj => imageObj.save()));
	

		if (res) {
			return { success: `${allImagesData.length} Images added successfully`};
		}
	} catch (error) {
		console.error('Error adding image:', error);
		return { error: 'Error adding image' };
	}
}

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
