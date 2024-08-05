import React, {useEffect, useState} 	from 'react'
import {debounce} 						from './debounce';

export const useCarousel = (wrapperRef: React.RefObject<HTMLDivElement>, innerRef: React.RefObject<HTMLDivElement> = wrapperRef) => {

	const [activeIndex, setActiveIndex] = useState<number>(0);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		const inner = innerRef.current;

		const handleActive = () => {
			if (!inner || !wrapper) {
				return;
			}

			const count = inner.childNodes.length;
			const elWidth = Math.round(wrapper.scrollWidth / count);
			setActiveIndex(Math.round((wrapper.scrollLeft + elWidth / 4) / elWidth));
		}

		const handleScroll = debounce(() => {
			handleActive();
		}, 10) as () => void;

		handleActive();

		wrapper.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleScroll);

		return (): void => {
			wrapper.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};

	}, [innerRef, wrapperRef]);

	return {activeIndex}
}