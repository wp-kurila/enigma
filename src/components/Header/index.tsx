import React, { MutableRefObject, useLayoutEffect, useRef, useState } from 'react';
import Nav from '../../ui-kit/Nav';
import { useIsMobile } from '../../utils/useIsMobile';
import MobileMenu from './MobileMenu';

import styles from './header.module.css';

interface Props {
	about: MutableRefObject<HTMLDivElement>;
	roomsLayout: MutableRefObject<HTMLDivElement>;
	questions: MutableRefObject<HTMLDivElement>;
	contacts: MutableRefObject<HTMLDivElement>;
}

const Header: React.FC<Props> = (props): React.ReactElement => {
	const isMobile = useIsMobile();
	const [isActiveMobileMenu, setIsActiveMobileMenu] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>();

	useLayoutEffect(() => {
		const zoom = document.documentElement.offsetWidth / 1920;

		if (zoom > 1) {
			ref.current.style.zoom = zoom.toString();
		}
	}, []);

	const toTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handleActiveMenu = () => {
		setIsActiveMobileMenu(!isActiveMobileMenu);
	};

	return (
		<header className={styles.header} ref={ref}>
			<button className={styles.logo} onClick={toTop}></button>
			{!isMobile && <Nav {...props} isHeader />}
			{/* {!isMobile && <Button className={styles.btn}>{t('btn__contact__manager')}</Button>} */}
			{isMobile && <button className={styles.mobile_menu__btn} onClick={handleActiveMenu}></button>}
			{isMobile && isActiveMobileMenu && <MobileMenu {...props} handleActiveMenu={handleActiveMenu} isActive />}
		</header>
	);
};

export default Header;
