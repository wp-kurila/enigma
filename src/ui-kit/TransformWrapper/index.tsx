import { FC, ReactElement, ReactNode, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useIsMobile } from '../../utils/useIsMobile';

interface Props {
	children: ReactNode;
	noZoom?: boolean;
}

const FadeInWithScroll: FC<Props> = (props: Props): ReactElement => {
	const ref = useRef<HTMLDivElement>(null);

	const isMobile = useIsMobile();

	useLayoutEffect(() => {
		const zoom = document.documentElement.offsetWidth / 1920;

		if (zoom > 1 && !props.noZoom) {
			ref.current.style.zoom = zoom.toString();
		}

		const el = ref.current;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
					observer.unobserve(el);
				}
			},
			{ threshold: isMobile ? 0.15 : 0.5 }
		);

		el && observer.observe(el);

		return () => el && observer.unobserve(el);
	}, []);

	return (
		<div ref={ref} style={{ opacity: 0, transform: `translateY(${isMobile ? 80 : 40}px)` }}>
			{props.children}
		</div>
	);
};

export default FadeInWithScroll;
