'use server';

import connectDB from '@/config/database';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

export default async function addUser(username: string, email: string, password: string) {
	const newUser = new User({
		username,
		email,
		password,
	});
	try {
		await connectDB();
		const duplicatedUser = await User.findOne({ email }).lean().exec();

		if (duplicatedUser) {			
			return { error: 'User already exists' };
		}

		if (password) {
			const hashedPassword = await bcrypt.hash(password, 10);
            newUser.password = hashedPassword;

		}
        const res = await User.create(newUser);

        if(res){
            console.log(res);
            return { success: 'User added successfully'};
            
        }

	} catch (error) {
        console.log(error);
        
    }
}
