import React, {forwardRef, Ref, useState, useEffect, useRef} from 'react';
import {useDrag} 			from '../../utils/useDrag';
import Popup 				from '../../ui-kit/Popup';
import cn 					from 'classnames';
import {ROOM_LAYOUTS, ROOM_LAYOUT_NAMES} 		from '../../consts';
import {useTranslation} 	from 'react-i18next';

import styles 				from './index.css';

interface Props {}

const RoomsLayout = (props: Props, ref: Ref<HTMLDivElement>): React.ReactElement => {

	const [activeTitle, setActiveTitle] = useState(0);
	const [isPopupActive, setIsPopupActive] = useState(false);
	const [activeLayout, setActiveLayout] = useState(null);
	const refLayout = useRef(null);
	const refWrapper = useRef(null);
	const refLayouts = useRef([]);

	const {t} = useTranslation();

	const {activeIndex, alreadyProcessed, setAlreadyProcessed} = useDrag(refLayout, refWrapper);

	useEffect(() => {
		const layoutId = ROOM_LAYOUTS[activeIndex].layoutId;
		setActiveTitle(layoutId);
	}, [activeIndex])

	const moveToElem = (index: number) => {
		const i = ROOM_LAYOUTS.findIndex(el => el.layoutId === index);
		const activeEl = refLayouts.current[i];
		
		refWrapper.current.style.left = -activeEl.offsetLeft + 'px';

		setActiveTitle(index);
	}

	const handleModal = (event) => {
		if (alreadyProcessed) {
			setAlreadyProcessed(false);
			return;
		};
		const target = event.target.closest('[data-tag]');

		if (!target) return;
		setActiveLayout(refLayouts.current.indexOf(target))
		setIsPopupActive(true)
	}

	return (
		<div className={styles.roomsLayout_wrapper} ref={ref}>
			{isPopupActive && <Popup closeHandler={() => setIsPopupActive(false)} {...ROOM_LAYOUTS[activeLayout]} />}
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
				<div className={styles.layouts_block} ref={refLayout}>
					<div className={styles.layouts_wrapper} ref={refWrapper} onClick={handleModal}>
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