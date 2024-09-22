import { FC, ReactElement, MutableRefObject } from 'react';
import Nav from '../../ui-kit/Nav';
import Langs from '../../ui-kit/Langs';
import Social from '../../ui-kit/Social';
import Copyright from '../../ui-kit/Copyright';
import cn from 'classnames';

import styles from './mobileMenu.module.css';

interface Props {
	about: MutableRefObject<HTMLDivElement>;
	roomsLayout: MutableRefObject<HTMLDivElement>;
	questions: MutableRefObject<HTMLDivElement>;
	contacts: MutableRefObject<HTMLDivElement>;
	handleActiveMenu: () => void;
	isActive?: boolean;
}

const MobileMenu: FC<Props> = (props: Props): ReactElement => {
	return (
		<>
			<div className={styles.overlay} onClick={props.handleActiveMenu} />
			<div className={cn(styles.mobileMenu, { [styles.mobileMenu_active]: props.isActive })} data-tag="mobileMenu">
				<button className={styles.btn_close} onClick={props.handleActiveMenu} />
				<div className={styles.logo} />
				<Nav {...props} className={styles.nav} />
				<Langs />
				<div className={styles.bottom_group}>
					<Social />
					<Copyright />
				</div>
			</div>
		</>
	);
};

export default MobileMenu;
