import mongoose, { Model, Schema, Types, model } from 'mongoose';

export type userType = {
	id: Types.ObjectId;
	email: string;
	username: string;
	password: string;
    role?: string;
};

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type UserModel = Model<userType & timestamps>;

const UserSchema = new Schema(
	{
		email: {
			type: String,
			unique: [true, 'Email already Exists'],
			required: [true, 'Email is required'],
		},
		password: { type: String, required: false },
		username: {
			type: String,
			required: [true, 'Username is required'],
		},
        role:{
            type: String,
			default: "ADMIN"
        }
	},
	{
		timestamps: true,
	},
);

const User: Model<userType> = mongoose.models.User || mongoose.model<userType>('User', UserSchema);

export default User;
