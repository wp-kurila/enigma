import {useEffect, RefObject} from 'react';

export const useDragNew = (innerRef: RefObject<HTMLDivElement>, wrapperRef: RefObject<HTMLDivElement> = innerRef) => {

	useEffect(() => {
		const inner = innerRef.current;
		const wrapper = wrapperRef.current;

		if (!inner || !wrapper) return;

		inner.addEventListener('pointerdown', onMouseDown);

		function onMouseDown(event) {
			const startPosition = event.clientX - inner.getBoundingClientRect().left;
			const scrollLeft = inner.scrollLeft;

			document.addEventListener('pointermove', onMouseMove);
			document.addEventListener('pointerup', onMouseUp);

			function onMouseMove(e) {
				const newLeft = e.clientX - inner.getBoundingClientRect().left;
				const walk = (newLeft - startPosition) * 2;

				inner.scrollLeft = scrollLeft - walk;
			}

			function onMouseUp() {
				document.removeEventListener('pointerup', onMouseUp);
				document.removeEventListener('pointermove', onMouseMove);
			}
		}
	}, []);
}