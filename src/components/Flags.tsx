import React, {useCallback, useEffect, useRef, useState} 	from 'react';
import {useTranslation} from 'react-i18next';
import cn 		from 'classnames';

import styles 	from './flags.css';

const langs = {
	en: {nativeName: 'English'},
	ru: {nativeName: 'Russian'}
}

const Flags: React.FC = (): React.ReactElement => {
	const {i18n} = useTranslation();

	// console.log('i18n')
	// console.log(i18n)

	const ref = useRef<HTMLDivElement>(null);
	const [showBlock, setShowBlock] = useState<boolean>(false);
	const [currentFlag, setCurrentFlag] = useState<string>(i18n.resolvedLanguage);

	const handleVisible = () => setShowBlock(prev => !prev);

	const handleLanguage = useCallback((lang: string) => {
		i18n.changeLanguage(lang);
		setCurrentFlag(lang);
	}, []);

	useEffect(() => {
		const el = ref?.current;
		// el && el.addEventListener("mousemove", onVisible);
		// el && el.addEventListener("mouseout", offVisible);
		el && el.addEventListener("click", handleVisible);
	}, []);

	return (
		<div className={styles.flags} ref={ref}>
			<button className={cn(styles.flag, styles[`${currentFlag}_flag`])}/>
			<div className={cn(styles.flags__block, {[styles.flags__block_active]: showBlock})}>
				{Object.keys(langs).map(lang => (
					<button
						key={lang}
						className={cn(styles.flag, styles[`${lang}_flag`])}
						onClick={() => handleLanguage(lang)}
						disabled={i18n.resolvedLanguage === lang}
					/>
				))}
			</div>
		</div>
	)
}

export default Flags;