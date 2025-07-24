import mongoose, { Model, Schema, Types, model } from 'mongoose';


export type imageType = {
    id: Types.ObjectId;
    title: string;
    tag: string;
    file: string;
    location?: string;
};

type timestamps = {
    createdAt: string;
    updatedAt: string;
};

export type ImageModel = Model<imageType & timestamps>;

const ImageSchema = new Schema(
    {
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

const Image: Model<imageType> = mongoose.models.Image || mongoose.model<imageType>('Image', ImageSchema);

export default Image;
