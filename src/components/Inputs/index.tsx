import { FC, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../utils/useIsMobile';
import Button from '../../ui-kit/Button';
import Block from '../../ui-kit/Block';
import Field from '../../ui-kit/Field';
import Form from '../../ui-kit/Form';
import { getImageLink } from '../../helpers';
import validation from '../../validation';

import styles from './inputs.module.css';
import { postData } from '../../api';
import Note from '../../ui-kit/Note';

const Inputs: FC = (): ReactElement => {
	const [data, setData] = useState({ name: '', phone: '', email: '', comment: '' });
	const [errors, setErrors] = useState({ name: '', phone: '', email: '', comment: '' });
	const [loading, setLoading] = useState(false);
	const [showNote, setShowNote] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const { t } = useTranslation();
	const isMobile = useIsMobile();

	const submit = async () => {
		const vr = validation(data, setErrors);

		if (Object.keys(vr).length !== 0) return;

		setLoading(true);
		const result = await postData(data, setLoading);
		setIsSuccess(result);
		setShowNote(true);
		setData({ name: '', phone: '', email: '', comment: '' });
	};

	return (
		<Block image={getImageLink(`house-inputs${isMobile ? '-mobile' : ''}`, '.png')}>
			{showNote && <Note setShowNote={setShowNote} isSuccess={isSuccess} />}
			<Form onSubmit={submit}>
				<div className={styles.title}>{t('inputs__title')}</div>
				<div className={styles.text}>{t('inputs__text')}</div>
				<div className={styles.inputs}>
					<Field
						name="name"
						type="email"
						autocomplete="email"
						label={t('inputs__input__name')}
						value={data}
						setValue={setData}
						errors={errors}
						setErrors={setErrors}
					/>
					<Field
						name="phone"
						type="tel"
						autocomplete="tel"
						label={t('inputs__input__tel')}
						value={data}
						setValue={setData}
						errors={errors}
						setErrors={setErrors}
					/>
					<Field
						name="email"
						type="email"
						autocomplete="email"
						label={t('inputs__input__email')}
						value={data}
						setValue={setData}
						errors={errors}
						setErrors={setErrors}
					/>
					<Field
						name="comment"
						type="email"
						label={t('inputs__input__comment')}
						value={data}
						setValue={setData}
						className={styles.textarea}
						errors={errors}
						setErrors={setErrors}
					/>
				</div>
				<div className={styles.btns}>
					<div className={styles.btns__text}>{t('inputs__btns__text')}</div>
					<Button className={styles.btns__btn} disabled={loading}>
						{t('inputs__btns__btn')}
					</Button>
				</div>
			</Form>
		</Block>
	);
};

export default Inputs;
