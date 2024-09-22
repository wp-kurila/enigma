import React from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../utils/useIsMobile';
import Button from '../../ui-kit/Button';
import Block from '../../ui-kit/Block';
import Field from '../../ui-kit/Field';
import Form from '../../ui-kit/Form';
import { getImageLink } from '../../helpers';

import styles from './inputs.module.css';

const Inputs: React.FC = (): React.ReactElement => {
	const { t } = useTranslation();
	const isMobile = useIsMobile();

	const submit = () => console.log(321);

	return (
		<Block image={getImageLink(`house-inputs${isMobile ? '-mobile' : ''}`, '.png')}>
			<Form onSubmit={submit}>
				<div className={styles.title}>{t('inputs__title')}</div>
				<div className={styles.text}>{t('inputs__text')}</div>
				<div className={styles.inputs}>
					<Field name="name" label={t('inputs__input__name')} className={styles.input} />
					<Field name="tel" label={t('inputs__input__tel')} className={styles.input} />
					<Field name="mail" label={t('inputs__input__email')} className={styles.input} />
					<Field name="messenger" label={t('inputs__input__messenger')} className={styles.input} />
					<Field name="comment" label={t('inputs__input__comment')} className={styles.input} />
				</div>
				<div className={styles.btns}>
					<div className={styles.btns__text}>{t('inputs__btns__text')}</div>
					<Button className={styles.btns__btn}>{t('inputs__btns__btn')}</Button>
				</div>
			</Form>
		</Block>
	);
};

export default Inputs;
