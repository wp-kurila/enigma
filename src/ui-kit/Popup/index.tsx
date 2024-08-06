import React, {useState, useRef, useLayoutEffect} 	from 'react';
import Portal 				from '../Portal';
import {getImageLink} 		from '../../helpers';
import {useTranslation} 	from 'react-i18next';
import cn 					from 'classnames';

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
	const imagesRef = useRef([]);
	const imagesWrapper = useRef(null);
	const imagesInner = useRef(null);
	const rootRef = useRef(null);

	useLayoutEffect(() => {
		const zoom = document.documentElement.offsetWidth / 1920;

		if (zoom > 1) {
			rootRef.current.style.zoom = zoom;
		}
	}, []);

	const clickOutside = (e) => {
		const target = e.target;

		if (!target.closest('[data-tag]')) {
			closeHandler();
		}
	}

	const handleActiveImage = (event) => {
		const target = event.target;
		const image = target.closest('[data-tag]');
		
		if (image.dataset.tag !== 'image') return;

		const index = imagesRef.current.indexOf(image);
		index !== activeImage && setActiveImage(index);
	}

	const handleScroll = (toBot?: boolean) => {
		imagesWrapper.current.scrollBy({
			top: (toBot ? 1 : -1) * 116,
			behavior: "smooth"
		});

		setActiveImage(activeImage + (toBot ? 1 : -1));
	}

	const imagesFolder = title.replace(/ /g, '-');
	const room_names: Record<string, string> = t('room__layouts__content', {returnObjects: true});

	return (
		<Portal>
			<div className={styles.popup} onClick={clickOutside} ref={rootRef}>
				<div className={styles.content}>
					<div className={styles.container} data-tag='popup'>
						<button className={styles.close_btn} onClick={closeHandler}/>
						<div className={styles.popup_content}>
							<div className={styles.images_list_block}>
								<button onClick={() => handleScroll()} className={styles.arrow_wrapper} disabled={activeImage === 0}><div className={cn(styles.arrow, styles.arrow_top)}/></button>
								<div className={styles.images_list_wrapper} ref={imagesWrapper}>
									<div className={styles.images_list} onMouseMove={handleActiveImage} ref={imagesInner}>
										{images.map((item, i) => {
											return (
												<div
													ref={el => imagesRef.current[i] = el}
													className={cn(styles.images_list__image, {[styles.images_list__image_active]: activeImage === i})}
													key={`popup_images_${i}`}
													data-tag='image'
													style={{backgroundImage: `url(${getImageLink(item, '.jpg', imagesFolder)})`}}
												/>
											)
										})}
									</div>
								</div>
								<button onClick={() => handleScroll(true)} className={styles.arrow_wrapper} disabled={activeImage === imagesRef.current.length - 1}><div className={styles.arrow}/></button>
							</div>
							<div className={styles.main_image_wrapper}>
								<div className={styles.main_image} style={{backgroundImage: `url(${getImageLink(images[activeImage], '.jpg', imagesFolder)})`}}/>
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