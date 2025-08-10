'use server';

import connectDB from '@/config/database';
import Image from '../models/image.model';

export const getImagesByTag = async (query: string) => {
	try {
		await connectDB();

		const images = await Image.aggregate([
			{
				$match: {
					tag: { $regex: query, $options: 'i' },
				},
			},
			{
				$sample: { size: 1000 },
			},
		]);

		if (images && images.length > 0) {
			const plainImages = [{}]
			return plainImages;
		} else {
			throw new Error('No Images with this Tag');
		}
	} catch (error) {
		console.error('Error fetching images:', error);
		throw new Error('Error fetching images');
	}
};
