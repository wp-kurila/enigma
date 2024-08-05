import React 	from 'react';
import cn 		from 'classnames';

import styles 	from './index.css';

interface Props {
	children: React.ReactNode;
	className: string;
	onClick?: () => void;
}

const Button: React.FC<Props> = (props: Props): React.ReactElement => {

	const {children, className, onClick} = props;

	const btnCls = cn(styles.button, className);

	return (
		<button className={btnCls} onClick={onClick}>{children}</button>
	)
}

export default Button;