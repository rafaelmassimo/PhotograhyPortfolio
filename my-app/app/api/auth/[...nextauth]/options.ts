import User from '@/app/models/user.model';
import { UserTypeImported } from '@/app/utils/types';
import connectDB from '@/config/database';
import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
	interface Session {
		maxAge?: number;
	}
}

export const authOptions = {

	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'your email' },
				password: { label: 'Password', type: 'password', placeholder: 'your password' },
			},
			async authorize(
				credentials: Record<'email' | 'password', string> | undefined,
			): Promise<any | null> {
				const { email, password } = credentials as { email: string; password: string };
				if (!email || !password) {
					return null;
				}
				try {
					await connectDB();
					const foundUser = (await User.findOne({ email: email })
						.lean()
						.exec()) as UserTypeImported | null;

					if (foundUser) {
						console.log('User found');
						//Compare the password with the hashed password
						const match = await bcrypt.compare(password, foundUser.password!);
						if (match) {
							console.log('Password match');
							delete (foundUser as { password?: string }).password;
							console.log('User:', foundUser);

							return foundUser;
						} else {
							console.log('Password does not match');
							return null;
						}
					} else {
						throw new Error('User not found');
					}
				} catch (error) {
					console.log('Error:', error);
				}
				return null; // Ensure you return null or a user object consistently
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user }: { token: any; account?: any; user?: any }) {
			if (account) {
				token.role = user.role;
			}
			return token;
		},
		//this has to be async
		session: async ({ session, token }: { session: any; token: any }) => {
			// Here I'm getting the data from the user from the DB to save it in the session

			try {
				await connectDB();
				console.log('Token:', token);
				console.log('inside session callback');
				const userData = await User.findOne({ email: token.email }).lean().exec();
				if (session.user) {
					// if you do not have a role it will be a *user* as defined below
					session.user.role = token.role || 'ADMIN';
					session.user.name = userData?.username;
				}
				session.maxAge = 30 * 24 * 60 * 60 * 100; // 30 days

				console.log('Session:', session);
			} catch (error) {
				console.log('Error:', error);
			}

			return session;
		},
	},
};

