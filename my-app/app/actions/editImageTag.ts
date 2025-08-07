'use server';

import { toPascalCase } from './../utils/functions';
import connectDB from '@/config/database';
import Image from '../models/image.model';

export const editImageTag = async (imageId: string, owner: string, newTag: string, newTitle?:string) => {
	
	try {
		await connectDB();

		const checkOwner = await Image.findOne({ _id: imageId });
		
		if (checkOwner?.owner?.toString() !== owner) {
			throw new Error('You are not the owner of this image');
		}
		const images = await Image.findByIdAndUpdate(
			imageId,
			{
				$set: {
					tag: toPascalCase(newTag),
					title: newTitle
				},
			},
			{ new: true },
		);

		if (images) {
			return { message: 'Tag Updated Successfully' };
		} else {
			return { message: 'Image not found', status: 404 };
		}
	} catch (error) {
		console.error('Error editing tag', error);
		return { message: 'Error fetching tags', status: 500 };
	}
};
