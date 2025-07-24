import mongoose, { Model, Schema, Types, model } from 'mongoose';


export type ImageType = {
    owner?: Types.ObjectId | string;
    id?: Types.ObjectId;
    title: string;
    tag: string;
    file: string;
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
        location:{
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
    },
);

const Image: Model<ImageType> = mongoose.models.Image || mongoose.model<ImageType>('Image', ImageSchema);

export default Image;
