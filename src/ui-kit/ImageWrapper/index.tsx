import React, { forwardRef, Ref } from 'react';
import cn from 'classnames';

import styles from './imageWrapper.module.css';

interface Props {
	children: React.ReactNode;
	className: string;
	onClick?: () => void;
}

const ImageWrapper = ({ children, className, onClick }: Props, ref: Ref<HTMLDivElement>): React.ReactElement => {
	return (
		<div ref={ref} className={cn(styles.image_wrapper, className)} onClick={onClick}>
			{children}
		</div>
	);
};

export default forwardRef<HTMLDivElement, Props>(ImageWrapper);
