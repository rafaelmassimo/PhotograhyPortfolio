import mongoose, { Model, Schema, Types } from 'mongoose';

export type UserTypeImported = {
	_id: Types.ObjectId;
	email: string;
	password: string | undefined;
	role?: string;
};