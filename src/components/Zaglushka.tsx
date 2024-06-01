import React 	from 'react';

import styles 	from './zaglushka.css';

const contacts = [
	{name: 'Email:', desc: 'info@enigma-residence.com', href: 'mailto:info@enigma-residence.com'},
	{name: 'Адрес Офиса:', desc: '5/66AB Moo 5, Wiset Road,\nRawai Subdistrict, Mueang\ndistrict, Phuket, 83130'},
	{name: 'Телефон:', desc: '+66 62 905 2181', href: 'tel:+66629052181'}
]

const Zaglushka: React.FC = (): React.ReactElement => {

	return (
		<div className={styles.zaglushka}>
			<div className={styles.logo}/>
			<div className={styles.temporaryTitle}>Сайт находится<br/>в разработке</div>
			<div className={styles.temporaryText}>Вы можете связаться с менеджерами<br/>или приехать лично в офис</div>
			<div className={styles.contacts}>
				{contacts.map((contact, i) => (
					<div key={i} className={styles.contact}>
						<div className={styles.contact__name}>{contact.name}</div>
						<a href={contact.href} className={styles.contact__desc}>{contact.desc}</a>
					</div>
				))}
			</div>
			<div className={styles.house}/>
		</div>
	)
}

export default Zaglushka;