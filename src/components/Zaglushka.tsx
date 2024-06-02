import React 	from 'react';
import Flags 	from './Flags';
import {useTranslation} 	from 'react-i18next';

import styles 	from './zaglushka.css';

const contacts = [
	{id: 'email', desc: 'info@enigma-residence.com', href: 'mailto:info@enigma-residence.com'},
	{id: 'address', desc: '5/66AB Moo 5, Wiset Road,\nRawai Subdistrict, Mueang\ndistrict, Phuket, 83130'},
	{id: 'tel', desc: '+66 62 905 2181', href: 'tel:+66629052181'}
]

const Zaglushka: React.FC = (): React.ReactElement => {
	const {t} = useTranslation();

	return (
		<div className={styles.zaglushka}>
			<div className={styles.logo}/>
			<div className={styles.temporaryTitle}>{t('temporaryTitle')}</div>
			<div className={styles.temporaryText}>{t('temporaryText')}</div>
			<div className={styles.contacts}>
				{contacts.map(contact => (
					<div key={contact.id} className={styles.contact}>
						<div className={styles.contact__name}>{t(contact.id)}</div>
						<a href={contact.href} className={styles.contact__desc}>{contact.desc}</a>
					</div>
				))}
			</div>
			<div className={styles.house}/>
			<Flags />
		</div>
	)
}

export default Zaglushka;