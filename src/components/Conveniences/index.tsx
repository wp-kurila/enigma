import React, {useRef, useEffect, useLayoutEffect, useState} 	from 'react';
import ImageWrapper 		from '../../ui-kit/ImageWrapper';
import {useCarousel} 		from '../../utils/useCarousel';
import {useDragNew} 		from '../../utils/useDragNew';
import {getImageLink} 		from '../../helpers';
import {CONVENIENCE_IMAGES} from '../../consts';
import {useTranslation} 	from 'react-i18next';
import cn 					from 'classnames';

import styles 				from './index.css';

const Conveniences: React.FC = (): React.ReactElement => {

	const {t} = useTranslation();
	const [active, setActive] = useState<number>(1);

	const imagesRef = useRef([]);
	const innerRef = useRef(null);
	const wrapperRef = useRef(null);

	const {activeIndex} = useCarousel(innerRef);
	useDragNew(innerRef, wrapperRef, true);

	useEffect(() => {
		setActive(activeIndex);
	}, [activeIndex]);

	useLayoutEffect(() => {
		innerRef.current.style.padding = `0 ${(document.documentElement.offsetWidth - imagesRef.current[0].offsetWidth) / 2}px`;
		innerRef.current.scrollTo({
			left: (innerRef.current.offsetLeft * -1) + imagesRef.current[active].offsetLeft - (document.documentElement.offsetWidth - imagesRef.current[active].offsetWidth) / 2
		});
	}, []);

	const descriptions: string[] = t('convenience__descriptions', {returnObjects: true});

	return (
		<div className={styles.conveniences}>
			<div className={styles.title}>{t('convenience__title')}</div>
			<div className={styles.images_content} ref={wrapperRef}>
				<div className={styles.images_content_wrapper} ref={innerRef}>
					{CONVENIENCE_IMAGES.map((item, i) => {
						return (
							<ImageWrapper key={`conveniences_image_${i}`} className={cn(styles.image_wrapper, {[styles.not_active]: i !== active})} ref={el => imagesRef.current[i] = el} /*onClick={() => handleActiveImage(i)}*/>
								<div style={{backgroundImage: `url(${getImageLink(item, '.png', 'conceniences')})`}}/>
							</ImageWrapper>
						)
					})}
				</div>
			</div>
			<div className={styles.text_content}>
				{descriptions.map((item, i) => {
					return (
						<React.Fragment key={`conveniences_text_${i}`}>
							<span className={styles.text} >{item}</span>
							{i !== descriptions.length - 1 && <span className={styles.text}>|</span>}
						</React.Fragment>
					)
				})}
			</div>
		</div>
	)
}

export default Conveniences;