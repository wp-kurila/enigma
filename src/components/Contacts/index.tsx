import React, {forwardRef, Ref} from 'react';
import {useTranslation} from 'react-i18next';
import Map 				from '../../ui-kit/Map';
import styles 			from './index.css';

interface Props {}

const Contacts = (props: Props, ref: Ref<HTMLDivElement>): React.ReactElement => {
	const {t} = useTranslation();

	const content: {title: string, description: 'string', href?: string}[] = t('contacts__content', {returnObjects: true});

	return (
		<div ref={ref}>
			<div className={styles.title}>{t('contacts__title')}</div>
			<div className={styles.content}>
				{content.map(({title, description, href}, i) => {
					return (
						<div key={`contacts_${i}`} className={styles.content__item}>
							<div className={styles.content__item__title}>{title}</div>
							{href ? (
								<a className={styles.content__item__description} href={href} target='_blank'>{description}</a>
							) : (
								<div className={styles.content__item__description}>{description}</div>
							)}
						</div>
					)
				})}
			</div>
			<Map />
		</div>
	)
}

export default forwardRef<HTMLDivElement, Props>(Contacts);