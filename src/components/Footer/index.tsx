import React, { MutableRefObject } from 'react';
import Nav from '../../ui-kit/Nav';
import Social from '../../ui-kit/Social';
import Copyright from '../../ui-kit/Copyright';

import styles from './footer.module.css';

interface Props {
	about: MutableRefObject<HTMLDivElement>;
	roomsLayout: MutableRefObject<HTMLDivElement>;
	questions: MutableRefObject<HTMLDivElement>;
	contacts: MutableRefObject<HTMLDivElement>;
}

const Footer: React.FC<Props> = (props: Props): React.ReactElement => {
	return (
		<footer className={styles.footer}>
			<Copyright />
			<Nav {...props} />
			<Social />
		</footer>
	);
};

export default Footer;
