import React, {forwardRef, Ref, useState, useEffect, useRef} from 'react';
import Popup 				from '../../ui-kit/Popup';
import cn 					from 'classnames';
import {ROOM_LAYOUTS, ROOM_LAYOUT_NAMES} 		from '../../consts';
import {useTranslation} 	from 'react-i18next';
import {useDragNew} 		from '../../utils/useDragNew';

import styles 				from './index.css';
import {useCarousel} from '../../utils/useCarousel';

interface Props {}

const RoomsLayout = (props: Props, ref: Ref<HTMLDivElement>): React.ReactElement => {

	const [activeTitle, setActiveTitle] = useState(0);
	const [isPopupActive, setIsPopupActive] = useState(false);
	const [selectedLayout, setSelectedLayout] = useState(null);
	const wrapperRef = useRef(null);
	const innerRef = useRef(null);
	const refLayouts = useRef([]);

	const {t} = useTranslation();

	useDragNew(innerRef, wrapperRef);
	const {activeIndex} = useCarousel(innerRef);

	useEffect(() => {

		setActiveTitle(ROOM_LAYOUTS[activeIndex].layoutId);
	}, [activeIndex]);

	const moveToElem = (index: number) => {
		const i = ROOM_LAYOUTS.findIndex(el => el.layoutId === index);
		const activeEl = refLayouts.current[i];

		innerRef.current.scrollTo({
			left: activeEl.offsetLeft - wrapperRef.current.offsetLeft,
			behavior: 'smooth'
		});
	}

	const handleModal = (event) => {
	// 	if (alreadyProcessed) {
	// 		setAlreadyProcessed(false);
	// 		return;
	// 	};
		const target = event.target.closest('[data-tag]');

		if (!target) return;
		console.log(target)
		setSelectedLayout(refLayouts.current.indexOf(target))
		setIsPopupActive(true)
	}

	return (
		<div className={styles.roomsLayout_wrapper} ref={ref}>
			{isPopupActive && <Popup closeHandler={() => setIsPopupActive(false)} {...ROOM_LAYOUTS[selectedLayout]} />}
			<div className={styles.roomsLayout}>
				<div className={styles.title}>{t('room__layouts__title')}</div>
				<div className={styles.layouts__titles}>
					{ROOM_LAYOUT_NAMES.map((item, i) => {
						return (
							<button
								key={`layout_titles_${i}`}
								className={cn(styles.layouts__title, {[styles.layouts__title_active]: i === activeTitle})}
								onClick={() => moveToElem(i)}
							>
								{item}
							</button>
						)
					})}
				</div>
				<div className={styles.layouts_block} ref={wrapperRef}>
					<div className={styles.layouts_wrapper} ref={innerRef} onClick={handleModal}>
						{ROOM_LAYOUTS.map(({title, total, layoutId}, i) => {
							return (
								<div key={`layouts_${i}`} data-tag='layout' className={cn(styles.layout, {[styles.layout_active]: layoutId === activeTitle})} ref={el => refLayouts.current[i] = el}>
									<div className={styles.layout__title}>{total} м²</div>
									<div className={styles.layout__description}>{title}</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default forwardRef<HTMLDivElement, Props>(RoomsLayout);