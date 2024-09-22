import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ImageWrapper from '../../ui-kit/ImageWrapper';
import Link from '../../ui-kit/Link';
import { HOUSE_DESCRIPTION } from '../../consts';
import { getPresentationLink } from '../../helpers';
import { useIsMobile } from '../../utils/useIsMobile';
import gsap from 'gsap';

import styles from './information.module.css';

const Information: React.FC = (): React.ReactElement => {
	const { t, i18n } = useTranslation();
	const elemsRef = useRef<HTMLDivElement[]>([]);
	const isMobile = useIsMobile();

	useEffect(() => {
		const mobileCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const target = entry.target;

					gsap.to(target, {
						opacity: 1,
						x: 0,
						duration: 1,
						ease: 'power2.out',
					});
					observer.unobserve(target);
				}
			});
		};

		const desktopCallback = ([entry]: IntersectionObserverEntry[]) => {
			if (entry.isIntersecting) {
				gsap.fromTo(
					elemsRef.current,
					{ opacity: 0, x: -50 },
					{
						opacity: 1,
						x: 0,
						duration: 1,
						stagger: 0.3,
						ease: 'power2.out',
					}
				);

				observer.disconnect();
			}
		};

		const observer = new IntersectionObserver(isMobile ? mobileCallback : desktopCallback, { threshold: 0.5 });

		elemsRef.current.forEach((el, index) => {
			if (isMobile || index === 0) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [isMobile]);

	const descriptions: string[] = t('information__data', { returnObjects: true });
	const link = getPresentationLink(i18n.language as 'ru' | 'en');

	return (
		<div className={styles.information}>
			<div className={styles.title}>Enigma Residence</div>
			<div className={styles.text}>{t('information__text')}</div>
			<Link href={link} className={styles.link}>
				{t('information__link')}
			</Link>
			<div className={styles.content}>
				{HOUSE_DESCRIPTION.map(({ title, image }, i) => {
					return (
						<div style={{ opacity: 0, transform: 'translate(-40px, 0)' }} key={`information_${i}`} className={styles.content__block} ref={(el) => (elemsRef.current[i] = el)}>
							<ImageWrapper className={styles.image_wrapper}>
								<div style={{ backgroundImage: `url(../../../static/images/components/${image}.png)` }} />
							</ImageWrapper>
							<div className={styles.text_wrapper}>
								<div>
									<div className={styles.content__block__title}>{title}</div>
									<div className={styles.description}>{descriptions[i]}</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Information;
