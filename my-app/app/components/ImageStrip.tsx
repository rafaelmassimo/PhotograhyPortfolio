import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { div } from 'framer-motion/client';
import Image from 'next/image';
import LoadingImages from './LoadingImages';
import { useRef, useEffect } from 'react';

export const ImageStrip = ({ images, speed }: { images: any[]; speed: number }) => {

	const x = useMotionValue(0);
	const containerRef = useRef<HTMLDivElement>(null);

	useAnimationFrame(() => {
		const current = x.get();
		const containerWidth = containerRef.current?.scrollWidth || 0;
		const halfWidth = containerWidth / 2;

		// Move left continuously
		const newX = current - 50 / speed; // Adjust speed here

		// Reset position when we've moved one full set of images
		if (newX <= -halfWidth) {
			x.set(0);
		} else {
			x.set(newX);
		}
	});

	return (
		<div className="overflow-hidden w-full bg-black">
			<motion.div ref={containerRef} className="flex" style={{ x }}>
				{images.length === 0 ? (
					<div className="flex flex-col justify-items-center items-center w-full h-10">
						<LoadingImages />
					</div>
				) : (
					/* Repeat images twice for a seamless loop */
					[...images, ...images].map((image, i) => (
						<div key={i} className="my-3 mx-2 w-30 h-20 flex-shrink-0 overflow-hidden rounded-xl">
							<Image
								src={image.file}
								alt={`strip-img-${i}`}
								width={100}
								height={80}
								className="rounded-lg object-cover"
								style={{ width: 'auto', height: 'auto' }}
							/>
						</div>
					))
				)}
			</motion.div>
		</div>
	);
};
