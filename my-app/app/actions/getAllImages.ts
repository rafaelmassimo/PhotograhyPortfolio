'use server';

import connectDB from '@/config/database';
import Image from '../models/image.model';


export async function getAllImages() {
	try {
		await connectDB();

		const res = await Image.find({}).sort({createdAt: -1});

		if (res) {
			// Convert MongoDB document to plain object
			const plainProduct = JSON.parse(JSON.stringify(res));
			return plainProduct;
		} else {
            return {message: 'Error fetching images', status: 402}
        }
	} catch (error) {
		console.log(error);
		return null;
	}
}



