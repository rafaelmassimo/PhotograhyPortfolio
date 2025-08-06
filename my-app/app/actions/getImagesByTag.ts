'use server';

import connectDB from '@/config/database';
import Image from '../models/image.model';

export const getImagesByTag = async (query: string) => {
    try {
        await connectDB();

        const images = await Image.aggregate([{
            $match: {
                tag: {$regex: query, $option: 'i'}
            }
        },
        {
            $sample: {size:1000}
        }
    ]);

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
