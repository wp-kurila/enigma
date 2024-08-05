import React, {useState, useEffect} from 'react';

const checkIsMobile = () => {
	return document.documentElement.offsetWidth <= 767;
}

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(checkIsMobile);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(checkIsMobile);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		}
	}, []);

	return isMobile;
}