import React from 'react';
import cn from 'classnames';

import styles from './button.module.css';

interface Props {
	children: React.ReactNode;
	className: string;
	onClick?: () => void;
	disabled: boolean;
}

const Button: React.FC<Props> = (props: Props): React.ReactElement => {
	const { children, className, onClick, disabled } = props;

	const btnCls = cn(styles.button, className);

	return (
		<button className={btnCls} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
