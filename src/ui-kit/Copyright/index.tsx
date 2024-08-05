import React 			from 'react';
import {useTranslation} from 'react-i18next';
import {useIsMobile} 	from '../../utils/useIsMobile';
import {getKrispyLink} 	from '../../helpers';
import styles 			from './index.css';

const Copyright: React.FC = (): React.ReactElement => {
	const {t, i18n} = useTranslation();
	const isMobile = useIsMobile();

	const content: string[] = t('copyright__content', {returnObjects: true});

	const link = getKrispyLink(i18n.language, isMobile);

	return (
		<div className={styles.copyright}>
			{content.map((item, i) => {
				return (
					i === content.length - 1 ? (
						<a key={`copyright_${i}`} target='_blank' href={link}>{item}</a>
					) : (
						<div key={`copyright_${i}`}>{item}</div>
					)
					
				)
			})}
		</div>
	)
}

export default Copyright;