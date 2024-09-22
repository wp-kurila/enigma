import { Options, Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { forwardRef, ReactElement, Ref, useEffect, useMemo, useRef, useState } from 'react';
import { ROOM_LAYOUTS, ROOM_LAYOUT_NAMES } from '../../consts';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import styles from './layouts.module.css';
import Popup from '../../ui-kit/Popup';

const Rooms = ({}, ref: Ref<HTMLDivElement>): ReactElement => {
	const { t } = useTranslation();
	const [activeLayout, setActiveLayout] = useState(0);
	const [splideInited, setSplideInited] = useState(false);
	const [selectedLayout, setSelectedLayout] = useState(null);
	const [showPopup, setShowPopup] = useState(false);
	const splideRef = useRef<Splide>(null);

	useEffect(() => {
		const splideInstance = splideRef.current?.splide;

		if (splideInstance && !splideInited) {
			splideInstance.on('move', (newIndex: number) => {
				setActiveLayout(ROOM_LAYOUTS[newIndex].layoutId);
			});
			setSplideInited(true);
		}
	}, []);

	const handleModal = (i: number) => {
		setSelectedLayout(i);
		setShowPopup(true);
	};

	const options = useMemo(() => {
		return {
			focusableNodes: 'button',
			arrows: false,
			pagination: false,
			direction: 'ltr',
			fixedWidth: Math.min(document.documentElement.offsetWidth * 0.21, 404),
			gap: 40,
			padding: { left: '29%', right: 96 },
			breakpoints: {
				1152: {
					fixedWidth: document.documentElement.offsetWidth * 0.255,
					gap: 12,
					padding: { left: '30%', right: 78 },
				},
				767: {
					fixedWidth: document.documentElement.offsetWidth * 0.52,
					padding: 18,
				},
			},
		} as Options;
	}, [document.documentElement.offsetWidth]);

	const moveToElem = (i: number) => {
		const index = ROOM_LAYOUTS.findIndex((item) => item.layoutId === i);
		splideRef.current?.go(index);
	};

	return (
		<div className={styles.rooms} ref={ref}>
			{showPopup && <Popup closeHandler={() => setShowPopup(false)} {...ROOM_LAYOUTS[selectedLayout]} />}
			<div className={styles.content_wrapper}>
				<div className={styles.title}>{t('room__layouts__title')}</div>
				<div className={styles.layout_titles}>
					{ROOM_LAYOUT_NAMES.map((item, i) => {
						return (
							<button key={`layout_title_${i}`} className={cn(styles.layouts_title, { [styles.layouts_title_active]: i === activeLayout })} onClick={() => moveToElem(i)}>
								{item}
							</button>
						);
					})}
				</div>
			</div>
			<Splide options={options} hasTrack={false} ref={splideRef}>
				<SplideTrack>
					{ROOM_LAYOUTS.map(({ title, total, layoutId }, i) => (
						<SplideSlide key={`room_layout_${i}`}>
							<button className={cn(styles.slide, { [styles.slide_active]: layoutId === activeLayout })} onClick={() => handleModal(i)}>
								<div className={styles.slide__title}>{total} м²</div>
								<div className={styles.slide__description}>{title}</div>
							</button>
						</SplideSlide>
					))}
				</SplideTrack>
			</Splide>
		</div>
	);
};

export default forwardRef<HTMLDivElement>(Rooms);
