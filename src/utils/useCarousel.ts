import React, {useEffect, useState} 	from 'react'
import {debounce} 						from './debounce';

export const findActiveIndex = (wrapper: HTMLDivElement, inner: HTMLDivElement, ratio = 4) => {
	if (!inner || !wrapper) {
		return;
	}

	const count = inner.childNodes.length;
	const elWidth = Math.round(inner.scrollWidth / count);
	return Math.round((wrapper.scrollLeft + elWidth / 2.5) / elWidth);
}

export const useCarousel = (wrapperRef: React.RefObject<HTMLDivElement>, innerRef: React.RefObject<HTMLDivElement> = wrapperRef) => {

	const [activeIndex, setActiveIndex] = useState<number>(0);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		const inner = innerRef.current;

		findActiveIndex(wrapper, inner);

		const handleScroll = debounce(() => {
			setActiveIndex(findActiveIndex(wrapper, inner));
		}, 10) as () => void;

		setActiveIndex(findActiveIndex(wrapper, inner));

		wrapper.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleScroll);

		return (): void => {
			wrapper.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};

	}, [innerRef, wrapperRef]);

	return {activeIndex}
}