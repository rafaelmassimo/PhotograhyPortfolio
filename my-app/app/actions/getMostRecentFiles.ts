'use server'
import connectDB from '@/config/database';
import Image from '../models/image.model';

export const getMostRecentImages = async () => {
	try {
		await connectDB();

		const images = await Image.find({}).sort({ createdAt: -1 }); // Sort by createdAt in descending order (most recent first)

		if (images && images.length > 0) {
			const plainImages = JSON.parse(JSON.stringify(images));
			return plainImages;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error fetching images:', error);
		return [];
	}
};
