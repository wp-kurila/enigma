import React, { MutableRefObject } from 'react';
import Langs from '../Langs';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import styles from './nav.module.css';

interface Props {
	about: MutableRefObject<HTMLDivElement>;
	roomsLayout: MutableRefObject<HTMLDivElement>;
	questions: MutableRefObject<HTMLDivElement>;
	contacts: MutableRefObject<HTMLDivElement>;
	isHeader?: boolean;
	className?: string;
	handleActiveMenu?: () => void;
}

const Nav: React.FC<Props> = (props: Props): React.ReactElement => {
	const { className = '', handleActiveMenu } = props;
	const { t } = useTranslation();

	const handleClick = (event) => {
		const target = event.target;

		if (target.dataset.tag === 'nav_elem') {
			target.dataset.to in props && props[target.dataset.to].current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
			handleActiveMenu && handleActiveMenu();
		}
	};

	const navCls = cn(styles.nav, className);

	return (
		<nav className={navCls} onClick={handleClick}>
			<a className={styles.nav__elem} data-tag="nav_elem" data-to="about">
				{t('nav__about')}
			</a>
			<a className={styles.nav__elem} data-tag="nav_elem" data-to="roomsLayout">
				{t('nav__layouts')}
			</a>
			<a className={styles.nav__elem} data-tag="nav_elem" data-to="questions">
				FAQ
			</a>
			<a className={styles.nav__elem} data-tag="nav_elem" data-to="contacts">
				{t('nav__contacts')}
			</a>
			{props.isHeader && <Langs />}
		</nav>
	);
};

export default Nav;
