import React 			from 'react';
import {getImageLink} 	from '../../helpers';
import {socials} 		from '../../consts';

import styles 			from './index.css';

const Social: React.FC = (): React.ReactElement => {

	return (
		<div className={styles.social}>
			{socials.map(({name, link}, i) => {
				const image_link = getImageLink(name, '.svg', 'ui-kit');
				return (
					<a key={`social_${i}`} href={link} target='_blank' className={styles.social__elem} style={{maskImage: `url(${image_link})`}} />
				)
			})}
		</div>
	)
}

export default Social;