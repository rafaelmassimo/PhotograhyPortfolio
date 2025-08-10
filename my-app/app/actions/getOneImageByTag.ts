'use server';
import { toPascalCase } from './../utils/functions';

import connectDB from '@/config/database';
import Image from '../models/image.model';

export const getOneImageByTag = async (query: string) => {
	try {
		await connectDB();

		const results = await Image.aggregate([
			{
				$match: {
					tag: { $regex: toPascalCase(query), $options: 'i' },
				},
			},
			{
				$sample: { size: 1 },
			},
		]);

		if (results && results.length > 0) {
			const res = results[0];
			const image = {
				url: res.file,
				tag: res.tag,
			};
			return image;
		} else {
			throw new Error('No Images with this Tag');
		}
	} catch (error) {
		console.error('Error fetching images:', error);
		throw new Error('Error fetching images');
	}
};
