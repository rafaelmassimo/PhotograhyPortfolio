'use client'

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PuffLoader } from 'react-spinners';

const ContactForm = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		try {
			setLoading(true);

			const res = await fetch('https://formspree.io/f/xwpqwkyp', {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
				},
			});

			if (res.ok) {
				toast.success('Message Sent!');
			}
		} catch (error) {
			toast.error('There Was an Error Submitting the Form');
		} finally {
			setLoading(false)
		}
	};

	return (
		<div>
			<div className="flex justify-center mb-4 mx-auto">
				<h1 className="mb-4 text-3xl font-bold text-gray-700 text-white text-5xl text-6xl">
					{/* Let's{' '} */}
					<span className="text-transparent bg-clip-text bg-gradient-to-l from-black to-grey-200 ">
						Lets Talk
					</span>{' '}
				</h1>
			</div>

			<form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
				<div className="flex flex-col justify-center items-center mb-4 w-10/12 gap-5">
					<label htmlFor="nameClient">
						<p className="text-gray-800 text-xl">Your Name</p>
					</label>
					<input
						type="text"
						placeholder="Insert Here"
						name="nameClient"
						className="input input-neutral bg-white w-full max-w-xs"
					/>

					<label htmlFor="emailClient">
						<p className="text-gray-800 text-xl">Your Email</p>
					</label>
					<input
						type="text"
						placeholder="Insert Here"
						name="emailClient"
						className=" input input-neutral bg-white w-full max-w-xs"
					/>

					<label htmlFor="numberClient">
						<p className="text-gray-800 text-xl">Your Number</p>
					</label>
					<input
						type="text"
						placeholder="Insert Here"
						name="numberClient"
						className="input input-neutral bg-white w-full max-w-xs"
					/>

					<label htmlFor="message">
						<p className="text-gray-800 text-xl">Your Message</p>
					</label>

					<textarea
						id="message"
						name="message"
						className="border rounded-lg w-full py-2 px-3 mb-2 h-32 overflow-y-scroll input input-neutral bg-white "
						placeholder="Type Here Your Message"
					/>
				</div>

				{loading ? (
					<PuffLoader color="#020103" size={30} speedMultiplier={2} />
				) : (
					<button type="submit" className="btn btn-soft bg-white btn-accent text-black">
						Send Message
					</button>
				)}
			</form>
		</div>
	);
};

export default ContactForm;
