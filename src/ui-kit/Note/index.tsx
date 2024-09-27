import { Dispatch, FC, ReactElement, SetStateAction, useEffect, useRef } from 'react';
import Portal from '../Portal';
import { Alert } from 'antd';

import styles from './note.module.css';
import { useTranslation } from 'react-i18next';

interface Props {
	setShowNote: Dispatch<SetStateAction<boolean>>;
	isSuccess: boolean;
}

const Note: FC<Props> = ({ setShowNote, isSuccess }: Props): ReactElement => {
	const { t } = useTranslation();

	useEffect(() => {
		const timerId = setTimeout(() => setShowNote(false), 4000);
		return () => {
			clearTimeout(timerId)
		};
	}, []);

	return (
		<Portal>
			<Alert className={styles.note} message={t(`note__title_${isSuccess ? 'success' : 'error'}`)} description={t(`note__text_${isSuccess ? 'success' : 'error'}`)} type={isSuccess ? 'success' : 'error'} showIcon />
		</Portal>
	);
};

export default Note;
