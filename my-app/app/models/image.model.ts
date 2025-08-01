import mongoose, { Model, Schema, Types, model } from 'mongoose';
import { unique } from 'next/dist/build/utils';

export type ImageType = {
	owner?: Types.ObjectId | string;
	_id?: Types.ObjectId;
	title?: string;
	tag: string;
	file: string;
	width?: Number;
	height?: Number;
	location?: string;
};

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type ImageModel = Model<ImageType & timestamps>;

const ImageSchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'The owner Image is required'],
		},

		title: {
			type: String,
			unique: [false],
			required: [true, 'Image title is required'],
		},
		tag: { type: String, required: [true, 'Tag is required'] },
		file: {
			type: String,
			unique: [true],
			required: [true, 'File is missing'],
		},
		location: {
			type: String,
			required: false,
		},
        height: {
            type: Number, require:[true, 'The images height is required'],
            unique: false
        },
        width: {
            type: Number, require:[true, 'The images width is required'],
            unique: false
        },
	},
	{
		timestamps: true,
	},
);

const Image: Model<ImageType> =
	mongoose.models.Image || mongoose.model<ImageType>('Image', ImageSchema);

export default Image;
