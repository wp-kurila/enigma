import React, {useRef} 	from 'react';
import cn 				from 'classnames';
import {useIsMobile} 	from '../../utils/useIsMobile';
import MobileView 		from './MobileView';
import {useTranslation} from 'react-i18next';

import styles 			from './index.css';

const Langs: React.FC = (): React.ReactElement => {

	const ref = useRef(null);

	const isMobile = useIsMobile();

	const {i18n} = useTranslation();

	const handleVisibleOn = () => {
		ref.current.classList.add(styles.block_active);
	}

	const handleVisibleOff = () => {
		ref.current.classList.remove(styles.block_active);
	}

	const handleLanguage = () => {
		i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
		handleVisibleOff();
	}

	if (isMobile) {
		return <MobileView />
	}

	return (
		<div className={styles.langs} onMouseEnter={handleVisibleOn} onMouseLeave={handleVisibleOff}>
			<div className={cn(styles.lang, styles.active_lang)}>{i18n.language}</div>
			<div className={styles.block} ref={ref}>
				<button className={styles.lang} onClick={handleLanguage}>{i18n.language === 'en' ? 'ru' : 'en'}</button>
			</div>
		</div>
	)
}

export default Langs;