import React from 'react';
import ImageWrapper from '../ImageWrapper';

import styles from './block.module.css';

interface Props {
	children: React.ReactElement | React.ReactElement[] | React.ReactNode;
	image: string;
}

const Block: React.FC<Props> = ({ children, image }: Props): React.ReactElement => {
	return (
		<div className={styles.block}>
			<ImageWrapper className={styles.image_wrapper}>
				<div className={styles.image} style={{ backgroundImage: `url(${image})` }} />
			</ImageWrapper>
			{children}
		</div>
	);
};

export default Block;
