import React, {useLayoutEffect, useRef} 	from 'react';
import {useDrag} 			from '../../utils/useDrag';
import {useTranslation} 	from 'react-i18next';

import styles 				from './index.css';

const Interior: React.FC = (): React.ReactElement => {

	const wrapperRef = useRef(null);
	const innerRef = useRef(null);

	const {t} = useTranslation();

	useLayoutEffect(() => {
		innerRef.current.style.left = `-${(innerRef.current.offsetWidth - wrapperRef.current.offsetWidth) / 2}px`
	}, [document.documentElement.offsetWidth]);

	useDrag(wrapperRef, innerRef);

	return (
		<div className={styles.interior}>
			<div className={styles.title}>{t('interior__title')}</div>
			<div className={styles.image_wrapper} ref={wrapperRef}>
				<div className={styles.image} ref={innerRef}/>
			</div>
		</div>
	)
}

export default Interior;