
import '../styles/homeStyles/FilmParallaxCustom.css';

import { useRef } from 'react';
import {
	motion,
	useScroll,
	useSpring,
	useTransform,
	useMotionValue,
	useVelocity,
	useAnimationFrame,
} from 'framer-motion';
import { wrap } from '@motionone/utils';

interface ParallaxProps {
	children: string;
	baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
	const baseX = useMotionValue(0);
	const { scrollY } = useScroll();
	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	});
	const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
		clamp: false,
	});

	// Magic wrapping for the length of the text
	const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

	const directionFactor = useRef<number>(1);
	useAnimationFrame((t, delta) => {
		let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

		if (velocityFactor.get() < 0) {
			directionFactor.current = -1;
		} else if (velocityFactor.get() > 0) {
			directionFactor.current = 1;
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get();

		baseX.set(baseX.get() + moveBy);
	});

		return (
			<div className="film-parallax parallax">
				<motion.div className="scroller" style={{ x }}>
					<span>{children} </span>
					<span>{children} </span>
					<span>{children} </span>
					<span>{children} </span>
				</motion.div>
			</div>
		);
}

const filmTypes =
	'Kodak Portra 400 Kodak Ektar 100 Kodak Gold 200 Kodak Tri-X 400 Kodak T-Max 400 Fujifilm Provia Fujifilm Velvia Fujifilm Astia Fujifilm Classic Chrome Fujifilm Acros Fujifilm Eterna Fujifilm Sepia';

export default function FilmParallax() {
	// Show the entire string as one long strip
	return (
		<div>
			<ParallaxText baseVelocity={0.1}>{filmTypes}</ParallaxText>
			<ParallaxText baseVelocity={-0.1}>{filmTypes}</ParallaxText>
		</div>
	);
}
