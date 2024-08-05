import React 			from 'react';
import cn 				from 'classnames';
import {useTranslation} from 'react-i18next';

import styles 			from './mobileView.css';

const MobileView: React.FC = (): React.ReactElement => {
	const {i18n} = useTranslation();

	const handleLang = (event) => {
		const target = event.target;

		const btn = target.closest('button');
		if (!btn) return;
		
		i18n.changeLanguage(btn.value);
	}

	return (
		<div className={styles.mobileView} onClick={handleLang}>
			<button className={cn(styles.lang, {[styles.lang_active]: i18n.language === 'ru'})} value='ru'>ru</button>
			<button className={cn(styles.lang, {[styles.lang_active]: i18n.language === 'en'})} value='en'>en</button>
		</div>
	)
}

export default MobileView;