import React from 'react';

import styles from './banner.module.css';

const Banner: React.FC = (): React.ReactElement => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.logo} />
			<div className={styles.banner} />
		</div>
	);
};

export default Banner;
