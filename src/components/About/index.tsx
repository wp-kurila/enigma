import React, { forwardRef, Ref } from 'react';
import Block from '../../ui-kit/Block';
import { getImageLink } from '../../helpers';
import { useIsMobile } from '../../utils/useIsMobile';
import { useTranslation } from 'react-i18next';

import styles from './about.module.css';

interface Props {}

const About = (props: Props, ref: Ref<HTMLDivElement>): React.ReactElement => {
	const { t } = useTranslation();
	const isMobile = useIsMobile();

	return (
		<div ref={ref}>
			<Block image={getImageLink(`house-about${isMobile ? '-mobile' : ''}`, '.png')}>
				<div>
					<div className={styles.title}>{t('about__title')}</div>
					<div className={styles.text}>{t('about__text')}</div>
				</div>
			</Block>
		</div>
	);
};

export default forwardRef<HTMLDivElement, Props>(About);
