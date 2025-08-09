'use server';

import { toPascalCase } from './../utils/functions';
import connectDB from '@/config/database';
import Image from '../models/image.model';

export const editImageTag = async (
	imageId: string,
	owner: string,
	newTag: string,
	newTitle?: string,
) => {
	try {
		await connectDB();

		const data = await Image.findOne({ _id: imageId });

		if (data?.owner?.toString() !== owner) {
			throw new Error('You are not the owner of this image');
		}

		const images = await Image.findByIdAndUpdate(
			imageId,
			{
				$set: {
					tag: toPascalCase(newTag) ?? toPascalCase(data.tag),
					title: newTitle ?? data.title,
				},
			},
			{ new: true },
		);

		console.log(data);
		
		const writeMessage = () => {
			const titleToUpdate = data.title === newTitle ? null : newTitle;
			const tagToUpdate = toPascalCase(data.tag) === toPascalCase(newTag) ? null : newTag;
			console.log(`title: ${titleToUpdate} tag: ${tagToUpdate}`);
			
			if (tagToUpdate && !titleToUpdate) {
				return 'Tag Updated Successfully';
			} else if (!tagToUpdate && titleToUpdate) {
				return 'Title Updated Successfully';
			} else if (tagToUpdate && titleToUpdate) {
				return 'Tag and Title Updated Successfully';
			} else if (!tagToUpdate && !titleToUpdate) {
				return 'No changes made';
			}
			return;
		};

		if (images) {
			return { message: `${writeMessage()}` };
		} else {
			return { message: 'Image not found', status: 404 };
		}
	} catch (error) {
		console.error('Error editing tag', error);
		return { message: 'Error fetching tags', status: 500 };
	}
};
