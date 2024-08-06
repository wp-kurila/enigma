import React 			from 'react';
import {useTranslation} from 'react-i18next';
import styles 			from './index.css';

const Copyright: React.FC = (): React.ReactElement => {
	const {t} = useTranslation();

	const content: string[] = t('copyright__content', {returnObjects: true});

	return (
		<div className={styles.copyright}>
			{content.map((item, i) => {
				return (
					i === content.length - 1 ? (
						<a className={styles.copyright__elem} key={`copyright_${i}`} target='_blank' href='https://krispy-studio.design/'>{item}</a>
					) : (
						<div className={styles.copyright__elem} key={`copyright_${i}`}>{item}</div>
					)
					
				)
			})}
		</div>
	)
}

export default Copyright;