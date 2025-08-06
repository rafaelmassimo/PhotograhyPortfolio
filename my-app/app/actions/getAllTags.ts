'use server';

import connectDB from '@/config/database';
import Image from '../models/image.model';

export async function getAllTags() {
	try {
		await connectDB();

		const tags = await Image.distinct('tag');

		if (tags) {
			// Convert MongoDB document to plain object
			const plainTags = JSON.parse(JSON.stringify(tags));            
			return plainTags;
		} else {
			return { message: 'Error fetching tags', status: 402 };
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}
