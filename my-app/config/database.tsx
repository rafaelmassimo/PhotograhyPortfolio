'use server'

import mongoose from 'mongoose';

let connected = false;

const connectDB = async (): Promise<void> => {
	mongoose.set('strictQuery', true);

	// if the database is already connected don't connect again.

	if (connected) {
		console.log('MongoDB is already connected');
		return;
	}

	// Connect to MongoDB

	try {
		const mongoUri: string | undefined = process.env.MONGODB_URI;
		if (!mongoUri) {
			throw new Error('MONGODB_URI is not defined in the environment variables');
		}
		await mongoose.connect(mongoUri);
		connected = true;
		console.log('MongoDB is connected 🤩');
		return;
	} catch (error) {
		console.log(error);
	}
};

export default connectDB;
