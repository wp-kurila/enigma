import React from 'react';
import cn from 'classnames';

import styles from './link.module.css';

interface Props {
	href: string;
	children: string;
	className?: string;
}

const Link: React.FC<Props> = ({ href, children, className = '' }: Props): React.ReactElement => {
	const linkClass = cn(styles.link, className);

	return (
		<a className={linkClass} href={href} target="_blank">
			{children}
		</a>
	);
};

export default Link;
