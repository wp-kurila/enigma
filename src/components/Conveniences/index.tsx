import '@splidejs/react-splide/css';
import { Splide, SplideSlide, Options } from '@splidejs/react-splide';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { getImageLink } from '../../helpers';
import { CONVENIENCE_IMAGES } from '../../consts';
import { useTranslation } from 'react-i18next';

import styles from './conveniences.module.css';

const Conveniences: React.FC = (): React.ReactElement => {
	const { t } = useTranslation();
	const splideRef = useRef<Splide>(null);
	const [splideInited, setSplideInited] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const slidesRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const splideInstance = splideRef.current?.splide;

		if (splideInstance && !splideInited) {
			splideInstance.on('move', (newIndex: number) => {
				setActiveIndex(newIndex);
			});
			setSplideInited(true);
		}
	}, []);

	useEffect(() => {
		slidesRef.current[activeIndex].classList.add(styles.activeSlide);

		return () => slidesRef.current[activeIndex].classList.remove(styles.activeSlide);
	}, [activeIndex]);

	const descriptions: string[] = t('convenience__descriptions', {
		returnObjects: true,
	});

	const options = useMemo(() => {
		return {
			arrows: false,
			pagination: false,
			direction: 'ltr',
			type: 'loop',
			autoWidth: true,
			height: 460,
			gap: '10em',
			focus: 'center',
			speed: 1000,
			perMove: 1,
			autoplay: true,
			interval: 3000,
			pauseOnHover: false,
			breakpoints: {
				1152: {
					gap: '8em',
					height: 360,
				},
				767: {
					gap: '3em',
					height: 380,
				},
			},
		} as Options;
	}, [document.documentElement.offsetWidth]);

	console.log('render');

	return (
		<div className={styles.conveniences}>
			<div className={styles.title}>{t('convenience__title')}</div>
			<div className={styles.splide_wrapper}>
				<Splide options={options} className={styles.splide} ref={splideRef}>
					{CONVENIENCE_IMAGES.map((item, i) => {
						return (
							<SplideSlide key={`conveniences_image_${i}`}>
								<div className={styles.slide_wrapper}>
									<div style={{ backgroundImage: `url(${getImageLink(item, '.png', 'conceniences')})` }} className={styles.slide} ref={(el) => (slidesRef.current[i] = el)} />
								</div>
							</SplideSlide>
						);
					})}
				</Splide>
			</div>
			<div className={styles.text_content}>
				{descriptions.map((item, i) => {
					return (
						<React.Fragment key={`conveniences_text_${i}`}>
							<span className={styles.text}>{item}</span>
							{i !== descriptions.length - 1 && <span className={styles.text}>|</span>}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default Conveniences;
