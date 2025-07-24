'use client';

import { useRouter } from 'next/navigation';
import { addImage } from '../actions/addImage';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export type NewImageType = {
	title: string;
	tag: string;
	file: string;
	location?: string;
};

const AddImageForm = () => {
	const route = useRouter();

	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);

		//* Get the single Image
		let imageBase64String = '';
		const imageFile = data.get('image') as File | null;

		if (imageFile) {
			const imageBuffer = await imageFile.arrayBuffer();
			const imageData = Buffer.from(new Uint8Array(imageBuffer));

			//* Convert the image data to base64
			const imageBase64 = imageData.toString('base64');
			imageBase64String = `data:${imageFile.type};base64,${imageBase64}`;
		}

		//* CREATE NEW OBJECT WITH THE DATA FROM FORM
		const newImageData = {
			title: data.get('title') as string,
			tag: data.get('tag') as string,
			file: imageBase64String,
			location: (data.get('location') as string) || '',
		};

		console.log(newImageData);

		try {
			//* CALL THE ADD PRODUCT ACTION

			setLoading(true);
			const res = await addImage(newImageData);
			if (res?.success) {
				console.log(res);
				
				alert('image successfully added');
				route.push(`${res.path}`);
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
