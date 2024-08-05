import React, {useRef, useEffect} from 'react';
import gsap 			from 'gsap';
import {useIsMobile} 	from '../../utils/useIsMobile';

interface Props {
	children: React.ReactElement;
}

const FadeInWithScroll: React.FC<Props> = (props: Props): React.ReactElement => {
	const ref = useRef<HTMLDivElement>(null);

	const isMobile = useIsMobile();

	useEffect(() => {
		const el = ref.current;
	
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
					observer.unobserve(el);
				  }
			},
			{threshold: isMobile ? 0.15 : 0.5}
		);

		el && observer.observe(el);

		return () => el && observer.unobserve(el);
	}, []);

	return (
		<div ref={ref} style={{opacity: 0, transform: 'translateY(40px)'}}>
			{props.children}
		</div>
	)
}

export default FadeInWithScroll;