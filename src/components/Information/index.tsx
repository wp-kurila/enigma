import React 				from 'react';
import {useTranslation} 	from 'react-i18next';
import ImageWrapper 		from '../../ui-kit/ImageWrapper';
import Link 				from '../../ui-kit/Link';
import {HOUSE_DESCRIPTION} 	from '../../consts';

import styles 				from './index.css';

const Information: React.FC = (): React.ReactElement => {

	const {t} = useTranslation();

	const descriptions: string[] = t('information__data', {returnObjects: true});

	return (
		<div className={styles.information}>
			<div className={styles.title}>Enigma Residence</div>
			<div className={styles.text}>{t('information__text')}</div>
			<Link href='/' className={styles.link}>{t('information__link')}</Link>
			<div className={styles.content}>
				{HOUSE_DESCRIPTION.map(({title, image}, i) => {
					return (
						<div key={`information_${i}`} className={styles.content__block}>
							<ImageWrapper className={styles.image_wrapper}>
								<div style={{backgroundImage: `url(../../../static/images/components/${image}.png)`}}/>
							</ImageWrapper>
							<div className={styles.text_wrapper}>
								<div>
									<div className={styles.content__block__title}>{title}</div>
									<div className={styles.description}>{descriptions[i]}</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Information;