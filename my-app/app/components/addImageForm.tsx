'use client';

export const dynamic = 'force-dynamic';

import { addImage } from '../actions/addImage';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import toast from 'react-hot-toast';
import { MoonLoader, PacmanLoader } from 'react-spinners';
import { uploadImageToCloudinaryServerSide } from '../actions/uploadToCloudinary';
import { useTagStore } from '../stores/tag.store';

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
	const [compressedImages, setCompressedImages] = useState<File[]>([]);
	const [miniLoading, setMiniLoading] = useState<boolean>(false);
	const [uploadedImageStatus, setUploadedImageStatus] = useState<number>(0);
	const setNewTagsByTags = useTagStore((state) => state.setTagByTags);

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
			const totalImages = compressedImages!.length + newFilesFormat.length;

			if (totalImages > 10) {
				e.target.value = '';
				toast.error('You can add up to 10 images at once');
			}

			try {
				setMiniLoading(true);
				const compressImagePromises = newFilesFormat.map(async (newFile) => {
					const compressedFile = await imageCompression(newFile, options);
					return compressedFile;
				});

				const allCompressedImages = await Promise.all(compressImagePromises);

				setCompressedImages([...compressedImages, ...allCompressedImages]);
			} catch (error) {
				toast.error('Compression error: ' + (error?.toString() ?? 'Unknown error'));
				return;
			} finally {
				setMiniLoading(false);
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);

		//* Validation form
		const title = data.get('title') as string;
		const tag = data.get('tag') as string;

		if (!title?.trim()) {
			toast.error('Please enter a title');
			return;
		}

		if (!tag?.trim()) {
			toast.error('Please enter a tag');
			return;
		}

		if (compressedImages.length === 0) {
			toast.error('Please select at least one image');
			return;
		}

		const allImagesData: any[] = [];

		try {
			setLoading(true);
			//*PREPARE THE IMAGES FOR UPLOAD
			for (const imageFile of compressedImages) {
				const imageBuffer = await imageFile.arrayBuffer();
				const imageArray = Array.from(new Uint8Array(imageBuffer));
				const imageData = Buffer.from(imageArray);

				//? Convert the image data to base64
				const compressedImages = imageData.toString('base64');

				const imagePayLoad = {
					image: `data:${imageFile.type};base64,${compressedImages}`,
				};

				//* UPLOADING IMAGE TO CLOUDINARY
				const uploadedImage = await uploadImageToCloudinaryServerSide(imagePayLoad.image);

				//* CREATE NEW OBJECT WITH THE DATA FROM FORM FOR EACH IMAGE
				const newImageData = {
					title: data.get('title') as string,
					tag: data.get('tag') as string,
					file: uploadedImage?.file,
					location: (data.get('location') as string) || '',
					width: uploadedImage?.sizes.width,
					height: uploadedImage?.sizes.height,
				};
				allImagesData.push(newImageData);
				setUploadedImageStatus((prev) => prev + 1);
			}
			//* SAVE NOW NEW IMAGES TO THE DATA BASE MONGODB
			const res = await addImage(allImagesData);

			//*RESULT
			if (res?.success) {
				setNewTagsByTags(tag);
				toast.success(res.success);
			} else {
				toast.error(res?.error ?? 'An error while saving images');
			}
		} catch (error) {
			alert(error);
			console.error('Error adding Images:', error);
		} finally {
			setLoading(false);
			setUploadedImageStatus(0);
			setCompressedImages([]);
			// Reset the entire form
			e.currentTarget.reset();
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col justify-center items-center mb-4 gap-2">
					{/* IMAGE FILE */}
					<fieldset className="fieldset">
						<legend className="text-center fieldset-legend">Select the Images</legend>
						<input
							name="image"
							accept="image/*"
							type="file"
							className="file-input file-input-ghost "
							onChange={(e) => handleImageChange(e)}
							multiple
						/>

						{/* Show a loader while the file are converted to Base64 */}
						{miniLoading && (
							<div className="flex flex-row items-center justify-center mt-2">
								<MoonLoader color="#4d26bb" size={30} />
							</div>
						)}

						{/* Show the total amount of images loaded */}
						{compressedImages.length > 0 && !miniLoading && (
							<div className="flex flex-col items-center justify-center">
								<div className="flex flex-col items-center justify-center h-20 text-sm text-gray-600 mt-2 overflow-y-auto">
									{compressedImages.map((image) => (
										<span>{image.name}</span>
									))}
								</div>
								<span className="badge badge-warning mt-2">{`${compressedImages.length} Selected`}</span>
							</div>
						)}

						{uploadedImageStatus > 0 && !miniLoading && (
							<div className="flex flex-col items-center justify-center h-20 text-sm text-gray-600 mt-2 overflow-y-auto">
								<span className="badge badge-neutral">
									{uploadedImageStatus === compressedImages.length
										? 'Saving Images into the DataBase...'
										: `Images Uploaded ${uploadedImageStatus}/${compressedImages.length}`}
								</span>
							</div>
						)}
					</fieldset>

					{/* IMAGE TITLE */}
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Insert the Title</legend>
						<input type="text" name="title" className="title" placeholder="Type here" required />
					</fieldset>

					{/* IMAGE TAG */}
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Insert the Tag</legend>
						<input type="text" name="tag" className="tag" placeholder="Type here" required />
					</fieldset>

					{/* LOCATION */}
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Insert the Location</legend>
						<input type="text" name="location" className="tag" placeholder="Type here" />
					</fieldset>

					{/* CONDITIONAL RENDERING: IF-ELSE CHAIN USING TERNARY OPERATORS */}

					{loading && <PacmanLoader color="#e8da25" />}

					{compressedImages.length > 0 &&
						!loading &&
						(miniLoading ? (
							<button className="btn btn-accent w-[132px] h-[40px]" type="submit">
								<MoonLoader color="#4d26bb" size={20} />
							</button>
						) : (
							<button className="btn btn-accent" type="submit">
								{/* Dynamic button text based on number of images */}
								{compressedImages.length === 1 ? 'Save Image' : 'Save Images'}
							</button>
						))}
				</div>
			</form>
		</>
	);
};

export default AddImageForm;
