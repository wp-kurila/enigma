import React from 'react';
import { useTranslation } from 'react-i18next';
import Block from '../../ui-kit/Block';
import Link from '../../ui-kit/Link';
import { getImageLink } from '../../helpers';

import styles from './location.module.css';

const Location: React.FC = (): React.ReactElement => {
	const { t } = useTranslation();

	return (
		<Block image={getImageLink('house-location', '.png')}>
			<div className={styles.location}>
				<div className={styles.title}>{t('location__title')}</div>
				<div className={styles.text}>{t('location__text')}</div>
				<div className={styles.text}>{t('location__text2')}</div>
				<Link className={styles.link} href="https://maps.app.goo.gl/4uAPBvubKnw8xjbP9">
					{t('location__btn')}
				</Link>
			</div>
		</Block>
	);
};

export default Location;
