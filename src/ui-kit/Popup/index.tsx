import React, {useState} 	from 'react';
import Portal 				from '../Portal';
import {getImageLink} 		from '../../helpers';
import {useTranslation} 	from 'react-i18next';

import styles 				from './index.css';

interface Props {
	closeHandler: () => void;
	title: string;
	images: string[];
	sizes: {name: string, size: number}[];
}

const Popup: React.FC<Props> = (props: Props): React.ReactElement => {

	const {closeHandler, title, sizes, images} = props;
	const [activeImage, setActiveImage] = useState(0);
	const {t} = useTranslation();
	const clickOutside = (e) => {
		const target = e.target;

		if (!target.closest('[data-tag]')) {
			closeHandler();
		}
	}

	const imagesFolder = title.replace(/ /g, '-');
	const room_names: Record<string, string> = t('room__layouts__content', {returnObjects: true});

	return (
		<Portal>
			<div className={styles.popup} onClick={clickOutside}>
				<div className={styles.content}>
					<div className={styles.container} data-tag='popup'>
						<button className={styles.close_btn} onClick={closeHandler}/>
						<div className={styles.popup_content}>
							<div className={styles.main_image_wrapper}>
								<div className={styles.main_image} style={{backgroundImage: `url(${getImageLink(images[activeImage], '.png', imagesFolder)})`}}/>
							</div>
							<div className={styles.right_content}>
								<div className={styles.title}>{title}</div>
								<div className={styles.sizes}>
									{sizes.map(({name, size}, i) => {
										return (
											<div key={`popup_sizes_${i}`} className={styles.size_block}>
												<div>{room_names[name]}</div>
												<div>{size}&nbsp;м²</div>
											</div>
										)
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Portal>
	)
}

export default Popup;