'use client';

import React, { useEffect, useState } from 'react';
import '@/app/styles/all.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';
import passions from '../utils/passionsDescriptions';
import { getOneImageByTag } from '../actions/getOneImageByTag';
import { splitAndCapitalize, toPascalCase } from '../utils/functions';
import AnimatedStrips from '../components/AnimatedStrips';
import Link from 'next/link';
import { useImageStore } from '../stores/image.store';
import { getAllImages } from '../actions/getAllImages';
import { FiRefreshCw } from 'react-icons/fi';
import LoadingImages from '../components/LoadingImages';

type ImageType = {
	tag: string;
	file: string;
};

function HomePage() {
	const imageStore = useImageStore((state) => state.images);
	const setImageStore = useImageStore((state) => state.setImages);
	const [samples, setSamples] = useState<ImageType[]>([]);
	const [refreshImages, setRefreshImages] = useState<number>(0);
	const [clicked, setClicked] = useState<boolean>(false);
	const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const anyFlipped = Object.values(flippedCards).some((v) => v);

	useEffect(() => {
		const fetchAllImages = async () => {
			const res = await getAllImages();
			if (res && res.length > 0) {
				setImageStore(res);
			}
		};

		fetchAllImages();
	}, [refreshImages]);

	useEffect(() => {
		if (imageStore.length > 0) {
			setIsLoading(true);
			const takeSampleImages = () => {
				const sampleImages: ImageType[] = [];

				for (const passion of passions) {
					// Find the first image that matches this passion's tag
					const foundImage = imageStore.find((image) => image.tag === toPascalCase(passion.title));
					if (foundImage && foundImage.file && foundImage.tag) {
						sampleImages.push({
							tag: foundImage.tag as string,
							file: foundImage.file as string,
						});
					}
				}
				setSamples(sampleImages);
				setTimeout(() => {
					setIsLoading(false);
				}, 900);
			};

			takeSampleImages();
		}
	}, [imageStore]);

	const handleCardClick = (index: number) => {
		setFlippedCards((previousObject) => ({
			...previousObject,
			[index]: !previousObject[index],
		}));
	};

	return (
		<div className="flex flex-col w-full lg:gap-y-40 px-4 overflow-hidden">
			{/* Title */}
			<div className="flex flex-col">
				<h1 className="mainTitle">Rafael Massimo</h1>
			</div>

			{/* Who I am */}
			<div>
				<div className="lg:grid grid-cols-2 lg:px-20 lg:mb-5 mobilePresentation">
					{/* DIV-1 */}
					<div className="flex flex-col items-center justify-center imageAnimationFromLeft">
						<h2 className="text-4xl font-bold mb-4">
							I'm Rafael Massimo Photographer & Front End Developer
						</h2>
						<p className="text-lg leading-relaxed text-gray-700 ">
							Photography is my way of capturing the world's beauty and telling stories through
							images. Alongside this passion, I'm also skilled in front-end development and
							currently expanding my knowledge by studying UX/UI design to create seamless digital
							experiences.
						</p>
					</div>

					{/* DIV-2 */}
					<div className="flex">
						<div className="w-5/6 mx-auto imageAnimationFromRight">
							<div className="overflow-hidden rounded-2xl">
								<Image
									src={'/Photo-3.jpg'}
									alt="camera image"
									width={1500}
									height={900}
									sizes="100vw"
									className="w-full h-full object-cover scale-150"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Camera Image */}
			<div className="bg-black py-10 -mx-4">
				<motion.div
					className="w-fit mx-auto overflow-hidden rounded-2xl"
					initial={{ scale: 0.6, opacity: 0 }}
					whileInView={{ scale: 0.9, opacity: 1 }}
					exit={{ scale: 0.6 }}
					viewport={{
						once: false,
						amount: 0.2,
						margin: '-100px',
					}}
					transition={{
						duration: 1,
						ease: 'easeInOut',
					}}
				>
					<Image
						src={'/20250809_171622.jpg'}
						alt="camera image"
						width={2000}
						height={1500}
						sizes="100vw"
						className="w-full object-cover"
					/>
				</motion.div>
			</div>

			{/* My Passions */}
			<div className="mb-20">
				<div className="flex flex-row justify-center items-center mb-10 mobilePassionsHeader">
					<h2 className="lg:text-5xl mr-5">My Passions</h2>

					<div
						className="flex flex-row active:text-gray-500 cursor-pointer passionRefreshButton"
						onClick={() => {
							setRefreshImages((prev) => prev + 1);
							setClicked(true);
							setTimeout(() => setClicked(false), 300);
						}}
					>
						<FiRefreshCw className={`${clicked ? 'rotate-icon' : ''} lg:text-xl  mr-2`} />

						<span className="items-center text-center justify-center">
							{anyFlipped ? 'Refresh the shoots' : 'Touch Any One'}
						</span>
					</div>
				</div>

				<div className="grid grid-cols-4 w-full gap-4 mx-auto place-items-center mobileGridPassions">
					{samples.length > 1 && (
						<>
							{passions.map((passion, i) => (
								<div key={i} className="perspective-1000 w-fit h-80">
									<motion.div
										className="gridSquare rounded-xl relative w-full h-full  cursor-pointer transition-transform duration-700 gridOption"
										initial={{ opacity: 0, y: 50, scale: 0.7, rotateY: 0 }}
										whileInView={{ opacity: 1, y: 0, scale: 1 }}
										animate={{ rotateY: flippedCards[i] ? 180 : 0 }}
										// whileHover={{ rotateY: 180, transition: { duration: 0.2 } }}
										transition={{
											delay: i * 0.3, // delay para outras animações
											opacity: { duration: 0.7, delay: i * 0.3 },
											y: { duration: 0.7, delay: i * 0.3 },
											scale: { duration: 0.7, delay: i * 0.3 },
											rotateY: { duration: 0.2, delay: 0 }, // delay zero para o flip
										}}
										viewport={{ once: true }}
										style={{ transformStyle: 'preserve-3d' }}
										onClick={() => handleCardClick(i)}
									>
										{/* Front Face */}
										<div className=" inset-0 w-full h-full flex flex-col p-5 backface-hidden  items-center justify-start rounded-xl bg-gray-900 mb-10 passionContent">
											<h2 className="text-3xl font-bold text-center text-white passionTitle">
												{splitAndCapitalize(passion.title)}
											</h2>
											<span className="lg:mt-10 text-white text-lg text-center passionDescription">
												{passion.description}
											</span>
										</div>

										{/* Back Face */}
										<div
											className="absolute inset-0 w-full h-full backface-hidden flex items-start justify-start rounded-xl transform rotate-y-180"
											style={{
												transform: 'rotateY(180deg)',
											}}
										>
											{toPascalCase(passion.title) === (samples[i]?.tag! as string) ? (
												isLoading ? (
													<div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-xl">
														<LoadingImages color="white" />
													</div>
												) : (
													<Image
														src={samples[i].file}
														alt="image"
														width={1500}
														height={900}
														className={`img w-full h-full rounded-xl object-cover z-100 ${
															passion.title === 'Portrait' ? 'object-top' : ''
														}`}
														loading="eager"
													/>
												)
											) : (
												''
											)}
										</div>
									</motion.div>
								</div>
							))}
						</>
					)}
				</div>
			</div>

			{/* Where I AM Located */}
			<div>
				<div className="flex flex-col justify-center items-center mb-10">
					<h2 className="text-5xl locationTitle">Where is My Location?</h2>
				</div>
				<div className="bg-black py-10 -mx-4 overflow-hidden">
					<motion.div
						className="w-fit mx-auto overflow-hidden rounded-2xl"
						initial={{ opacity: 0, x: 100 }}
						whileInView={{ opacity: 1, x: 0, scale: 0.9 }}
						exit={{ opacity: 0, scale: 0.5 }}
						viewport={{ once: false, amount: 0.3 }}
						transition={{
							duration: 2,
							ease: 'easeInOut',
						}}
					>
						<Image
							src={'/vancouver.jpg'}
							alt="camera image"
							width={1500}
							height={900}
							sizes="100vw"
							className="w-80% object-cover"
						/>
					</motion.div>
				</div>
			</div>
			{/* Slide Images */}
			<div className="-mx-4 bg-black py-10 slideImagesDiv">
				<div className="flex flex-col justify-center items-center mb-10">
					<h2 className="text-5xl text-white slideImagesTitle">
						Catch Them If You Can, My Shots Are Passing By
					</h2>
				</div>
				<div className="cursor-pointer ">
					<AnimatedStrips />
				</div>
			</div>

			{/* Wanna Talk */}
			<div className="flex flex-col justify-center items-center w-full">
				<span className="mb-5 text-2xl">Wanna Talk?</span>
				<Link href={'/getInTouch'}>
					<button className="btn btn-soft btn-accent">Get in Touch</button>
				</Link>
			</div>
		</div>
	);
}

export default HomePage;
