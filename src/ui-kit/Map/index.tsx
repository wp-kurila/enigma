import React, { useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import { MAPS_KEY } from '../../../key';
// import { getImageLink } from '../../helpers';
import Button from '../Button';

import styles from './map.module.css';

const center = {
	lat: 7.812960873536211,
	lng: 98.33940945240678,
};

const stylesMap = [
	{
		featureType: 'landscape',
		elementType: 'all',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'poi.business',
		elementType: 'all',
		stylers: [
			{
				visibility: 'simplified',
			},
		],
	},
	{
		featureType: 'poi.business',
		elementType: 'labels',
		stylers: [
			{
				visibility: 'simplified',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'all',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'poi.school',
		elementType: 'all',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'poi.sports_complex',
		elementType: 'all',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'transit.station.bus',
		elementType: 'all',
		stylers: [
			{
				visibility: 'on',
			},
			{
				saturation: '21',
			},
			{
				weight: '4.05',
			},
		],
	},
];

const Map: React.FC = (): React.ReactElement => {
	const ref = useRef(null);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: MAPS_KEY,
	});
	const { t } = useTranslation();

	useEffect(() => {}, [isLoaded]);

	const openLink = useCallback(() => window.open('https://maps.app.goo.gl/cwYubmZm3TvmSm9k8', '_blank'), []);

	// const link = getImageLink('marker', '.svg', 'ui-kit');

	return isLoaded ? (
		<GoogleMap
			id="googleMaps"
			mapContainerClassName={styles.map_wrapper}
			center={center}
			zoom={14.8}
			options={{
				styles: stylesMap,
				disableDefaultUI: true,
				keyboardShortcuts: false,
			}}
			ref={ref}
		>
			<Button className={styles.btn} onClick={openLink}>
				{t('map__btn')}
			</Button>
			<>
				<Marker position={center} />
			</>
		</GoogleMap>
	) : (
		<></>
	);
};

export default React.memo(Map);
