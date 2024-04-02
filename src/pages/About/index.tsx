import React 	from 'react';

import styles 	from './index.css';

const About: React.FC = (): React.ReactElement => {
	return (
		<div className={styles.about}>
			About
			<div className={styles.icon}/>
		</div>
	)
}

export default About;