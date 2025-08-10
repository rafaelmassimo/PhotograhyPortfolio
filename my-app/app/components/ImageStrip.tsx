import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';
import Image from 'next/image';
import LoadingImages from './LoadingImages';

export const ImageStrip = ({ images, speed }: { images: any[]; speed: number }) => {
	console.log(images[0].file);
	
	return (
		<div className="overflow-hidden w-full">
			<motion.div
				className="flex"
				animate={{ x: ['0%', '-150%'] }}
				transition={{
					duration: speed,
					repeat: Infinity,
					ease: 'linear',
				}}
			>
				{images.length === 0 && (
					<div className="flex flex-col justify-items-center items-center w-full h-10 gap-20">
						<LoadingImages/>
					</div>
				)}

				{/* Repeat images twice for a seamless loop */}
				{[...images, ...images].map((image, i) => (
					<div key={i} className="mx-2 w-30 h-20 flex-shrink-0 overflow-hidden rounded-xl">
						<Image
							src={image.file}
							alt={`strip-img-${i}`}
							width={100}
							height={80}
							className="rounded-lg object-cover"
							style={{ width: 'auto', height: 'auto' }}
						/>
					</div>
				))}
			</motion.div>
		</div>
	);
};
