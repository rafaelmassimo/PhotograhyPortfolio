'use client';

import { useRouter } from 'next/navigation';
import { addImage } from '../actions/addImage';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { ImageType } from '../models/image.model';
import toast from 'react-hot-toast';
import { PacmanLoader } from 'react-spinners';

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
	const [loading, setLoading] = useState<boolean>(false);
	const [imageBase64, setImageBase64] = useState<File[]>([]);
	const [imageObjects, setImageObjects] = useState<any[]>([]);

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const options = {
			maxSizeMB: 0.8,
			maxWidthOrHeight: 2400,
			useWebWorker: true,
			fileType: 'image/webp', // output format
		};

		const files = e.target.files;

		if (files) {
			const newFilesFormat = Array.from(files);
			const totalImages = imageBase64!.length + newFilesFormat.length;

			if (totalImages > 10) {
				e.target.value = '';
				toast.error('You can add up to 10 images at once');
			}

			try {
				const compressImagePromises = newFilesFormat.map(async (newFile) => {
					const compressedFile = await imageCompression(newFile, options);
					return compressedFile;
				});

				const allCompressedImages = await Promise.all(compressImagePromises);

				setImageBase64([...imageBase64, ...allCompressedImages]);
			} catch (error) {
				toast.error('Compression error: ' + (error?.toString() ?? 'Unknown error'));
				return;
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const allImagesData: any[] = [];

		//*PREPARE THE IMAGES FOR UPLOAD
		for (const imageFile of imageBase64) {
			const imageBuffer = await imageFile.arrayBuffer();
			const imageArray = Array.from(new Uint8Array(imageBuffer));
			const imageData = Buffer.from(imageArray);

			// Convert the image data to base64
			const imageBase64 = imageData.toString('base64');

			const imagePayLoad = {
				image: `data:${imageFile.type};base64,${imageBase64}`,
			};

			//* CREATE NEW OBJECT WITH THE DATA FROM FORM FOR EACH IMAGE
			const newImageData = {
				title: data.get('title') as string,
				tag: data.get('tag') as string,
				file: imagePayLoad.image,
				location: (data.get('location') as string) || '',
			};
			allImagesData.push(newImageData);
		}
		// setImageObjects(allImagesData);
		console.log(allImagesData);
		
		try {
			//* CALL THE ADD PRODUCT ACTION
			setLoading(true);
			const res = await addImage(allImagesData);
			if (res?.success) {
				toast.success(res.success);
			} else {
				toast.error(res?.error ?? 'An unknown error occurred');
			}
		} catch (error) {
			alert('Error adding photos front end')
			console.error('Error adding product:', error);
		} finally {
			setLoading(false);
		}
	};
	// console.log(imageObjects);

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
							multiple
						/>
						{imageBase64.length > 0 && (
							<div className="text-sm text-gray-600 mt-2">
								{imageBase64.length} image(s) selected
							</div>
						)}
					</fieldset>

					{/* IMAGE TITLE */}
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Insert the Title</legend>
						<input type="text" name="title" className="title" placeholder="Type here" />
					</fieldset>

					{/* IMAGE TAG */}
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Insert the Tag</legend>
						<input type="text" name="tag" className="tag" placeholder="Type here" multiple />
					</fieldset>

					{/* LOCATION */}
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Insert the Location</legend>
						<input type="text" name="location" className="tag" placeholder="Type here" />
					</fieldset>

					{loading ? (
						<PacmanLoader color="#e8da25" />
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
