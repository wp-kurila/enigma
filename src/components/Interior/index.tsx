import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './interior.module.css';

const Interior: FC = (): ReactElement => {
	const { t } = useTranslation();

	return (
		<div className={styles.interior}>
			<div className={styles.title}>{t('interior__title')}</div>
			<div className={styles.image_wrapper}>
				<div className={styles.image} />
			</div>
		</div>
	);
};

export default Interior;
