import React, {forwardRef, Ref, useRef, useState} from 'react';
import {useTranslation} 	from 'react-i18next';
import Accordion 			from '../../ui-kit/Accordion';

import styles 				from './index.css';

interface Props {}

const Questions = (props: Props, ref: Ref<HTMLDivElement>): React.ReactElement => {

	const accordionsList = useRef(null);
	const [active, setActive] = useState(null);
	const {t} = useTranslation();

	const handleActive = (event) => {
		const target = event.target;
		const accordion = target.closest('[data-tag]');

		if (accordion) {
			setActive(Array.from(accordionsList.current.childNodes).indexOf(accordion))
		}
	}

	const content: {title: string, text: string}[] = t('faq__content', {returnObjects: true});

	return (
		<div className={styles.questions} ref={ref}>
			<div className={styles.title}>{t('faq__title')}</div>
			<div className={styles.accordions_wrapper} onClick={handleActive} ref={accordionsList}>
				{content.map(({title, text}, i) => {
					return (
						<Accordion title={title} text={text} key={`accordion_${i}`} tag='accordion' active={i === active} removeActive={() => setActive(-1)} />
					)
				})}
			</div>
		</div>
	)
}

export default forwardRef<HTMLDivElement, Props>(Questions);