import React from 'react';
import cn from 'classnames';

import styles from './accordion.module.css';

interface Props {
	title: string;
	text: string;
	tag: string;
	active: boolean;
	removeActive: () => void;
}

const Accordion: React.FC<Props> = ({ title, text, tag, active, removeActive }: Props): React.ReactElement => {
	const _removeActive = (event) => {
		if (active) {
			event.stopPropagation();
			removeActive();
		}
	};

	return (
		<div className={cn(styles.accordion, { [styles.accordion_active]: active })} data-tag={tag}>
			<div className={styles.accordion__main_block}>
				<div className={styles.title}>{title}</div>
				<button className={styles.arrow} onClick={_removeActive} />
			</div>
			<div className={styles.accordion__add_block}>
				<div>{text}</div>
			</div>
		</div>
	);
};

export default Accordion;
