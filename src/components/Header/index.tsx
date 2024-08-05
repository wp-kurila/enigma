import React, {MutableRefObject, useState} 	from 'react';
import Nav 				from '../../ui-kit/Nav';
import Button 			from '../../ui-kit/Button';
import {useIsMobile} 	from '../../utils/useIsMobile';
import MobileMenu 		from './MobileMenu';

import {useTranslation} from 'react-i18next';

import styles 			from './index.css';

interface Props {
	about: MutableRefObject<HTMLDivElement>;
	roomsLayout: MutableRefObject<HTMLDivElement>;
	questions: MutableRefObject<HTMLDivElement>;
	contacts: MutableRefObject<HTMLDivElement>;
}

const Header: React.FC<Props> = (props): React.ReactElement => {

	const {t} = useTranslation();
	const isMobile = useIsMobile();
	const [isActiveMobileMenu, setIsActiveMobileMenu] = useState<boolean>(false);

	const toTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	const handleActiveMenu = () => {
		setIsActiveMobileMenu(!isActiveMobileMenu);
	}

	return (
		<header className={styles.header}>
			<button className={styles.logo} onClick={toTop}></button>
			{!isMobile && <Nav {...props} isHeader />}
			{/* {!isMobile && <Button className={styles.btn}>{t('btn__contact__manager')}</Button>} */}
			{isMobile && <button className={styles.mobile_menu__btn} onClick={handleActiveMenu}></button>}
			{isMobile && isActiveMobileMenu && <MobileMenu {...props} handleActiveMenu={handleActiveMenu} isActive />}
		</header>
	)
}

export default Header;