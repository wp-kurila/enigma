import React, {useRef, useEffect, useLayoutEffect, useState} 	from 'react';
import ImageWrapper 		from '../../ui-kit/ImageWrapper';
import cn 					from 'classnames';
import {useTranslation} 	from 'react-i18next';
import {useCarousel} 		from '../../utils/useCarousel';
import {getImageLink} 		from '../../helpers';
import {CONVENIENCE_IMAGES} from '../../consts';

import styles 				from './index.css';

const Conveniences: React.FC = (): React.ReactElement => {

	const {t} = useTranslation();
	const [active, setActive] = useState<number>(1);

	const imagesRef = useRef([]);
	const wrapperRef = useRef(null);
	const ref = useRef(null);

	const {activeIndex} = useCarousel(wrapperRef);

	useEffect(() => {
		setActive(activeIndex);
	}, [activeIndex]);

	useLayoutEffect(() => {
		wrapperRef.current.scrollTo({
			left: (imagesRef.current[0].offsetLeft * -1) + imagesRef.current[active].offsetLeft - document.documentElement.offsetWidth / 2 + imagesRef.current[active].offsetWidth / 2
		});
	}, []);

	const handleActiveImage = (index: number) => {
		wrapperRef.current.scrollTo({
			left: (imagesRef.current[0].offsetLeft * -1) + imagesRef.current[index].offsetLeft - document.documentElement.offsetWidth / 2 + imagesRef.current[index].offsetWidth / 2,
			behavior: "smooth",
		});
		setActive(index);
	}

	const descriptions: string[] = t('convenience__descriptions', {returnObjects: true});

	return (
		<div className={styles.conveniences}>
			<div className={styles.title}>{t('convenience__title')}</div>
			<div className={styles.images_content} ref={ref}>
				<div className={styles.images_content_wrapper} ref={wrapperRef}>
					{CONVENIENCE_IMAGES.map((item, i) => {
						return (
							<ImageWrapper key={`conveniences_image_${i}`} className={cn(styles.image_wrapper, {[styles.not_active]: i !== active})} ref={el => imagesRef.current[i] = el} onClick={() => handleActiveImage(i)}>
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