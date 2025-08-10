'use client';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import Link from 'next/link';
import { toPascalCase } from '../utils/functions';

export const ImageStrip = ({ images, index }: { images: any[]; index: number }) => {
	const getSpeed = () => {
		if (index === 0) return 80; // faster
		if (index === 1) return 50;
		if (index === 2) return 30; 
		if (index === 3) return 20; // slower
		return 50;
	};

	return (
		<div className="w-full bg-black overflow-hidden">
			<Marquee
				speed={getSpeed()}
				gradient={false} // sem fade nas bordas
				pauseOnHover={true} // pode ativar se quiser parar no hover
				direction="left"
				autoFill
			>
				{images.map((image, i) => (
					<div key={i} className="my-3 mx-2 w-32 h-20  overflow-hidden rounded-xl">
						<Link href={`/${toPascalCase(image.tag)}`}>
						<Image
							src={image.file}
							alt={`strip-img-${i}`}
							width={100}
							height={80}
							className="rounded-lg object-cover"
							style={{ width: 'auto', height: 'auto' }}
							loading="eager"
							quality={80} 
							/>
							</Link>
					</div>
				))}
			</Marquee>
		</div>
	);
};
