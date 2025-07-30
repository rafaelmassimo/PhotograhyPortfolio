'use client';

import { useRouter } from 'next/navigation';
import { addImage } from '../actions/addImage';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { ImageType } from '../models/image.model';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

export type NewImageType = {
	title: string;
	tag: string;
	file: string;
	location?: string;
	height: number;
	width: number;
};

const AddImageForm = () => {
	const route = useRouter();

	const [loading, setLoading] = useState<boolean>(false);
	const [imageBase64, setImageBase64] = useState<string>();

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		const options = {
			maxSizeMB: 0.8,
			maxWidthOrHeight: 2400,
			useWebWorker: true,
			fileType: 'image/webp', // output format
		};

		try {
			if (file) {
				const compressedFile = await imageCompression(file, options);
				const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
				setImageBase64(base64);
			}
		} catch (error) {
			console.error('Compression error:', error);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);

		//* CREATE NEW OBJECT WITH THE DATA FROM FORM
		const newImageData = {
			title: data.get('title') as string,
			tag: data.get('tag') as string,
			file: imageBase64 as string,
			location: (data.get('location') as string) || '',
		};

		try {
			//* CALL THE ADD PRODUCT ACTION
			setLoading(true);
			const res = await addImage(newImageData);
			if (res?.success) {
				console.log(res);
				toast.success('Image added successfully');
			} else {
				alert(res?.error);
			}
		} catch (error) {
			console.error('Error adding product:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col justify-center items-center mb-4 gap-2">
					{/* IMAGE FILE */}
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Select the Image</legend>
						<input
							type="file"
							name="image"
							accept="image/*"
							className="file-input file-input-accent"
							onChange={(e) => handleImageChange(e)}
						/>
					</fieldset>

					{/* IMAGE TITLE */}
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Insert the Title</legend>
						<input type="text" name="title" className="title" placeholder="Type here" />
					</fieldset>

					{/* IMAGE TAG */}
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Insert the Tag</legend>
						<input type="text" name="tag" className="tag" placeholder="Type here" />
					</fieldset>

					{/* LOCATION */}
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Insert the Location</legend>
						<input type="text" name="location" className="tag" placeholder="Type here" />
					</fieldset>

					{loading ? (
						'Loading...'
					) : (
						<button className="btn btn-accent" type="submit">
							Save Image
						</button>
					)}
				</div>
			</form>
		</>
	);
};

export default AddImageForm;
