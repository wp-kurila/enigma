import {useEffect, useState} from 'react';

export const useDrag = (wrapperRef: React.RefObject<HTMLDivElement>, innerRef: React.RefObject<HTMLDivElement>) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [alreadyProcessed, setAlreadyProcessed] = useState<boolean>(false);

	useEffect(() => {
		const inner = innerRef.current;
		const wrapper = wrapperRef.current;
	
		if (!inner || !wrapper) return;

		inner.addEventListener('pointerdown', onMouseDown);
		inner.style.touchAction = 'none';

		function onMouseDown(event) {
			const startPosition = event.clientX - inner.getBoundingClientRect().left;

			document.addEventListener('pointermove', onMouseMove);
			document.addEventListener('pointerup', onMouseUp);

			function onMouseMove(e) {
				setAlreadyProcessed(true);
				let newLeft = e.clientX - startPosition - wrapper.getBoundingClientRect().left;

				if (newLeft > 0) newLeft = 0;

				let rightEdge = wrapper.offsetWidth - inner.offsetWidth;

				if (newLeft < rightEdge) newLeft = rightEdge;
	
				inner.style.left = newLeft + 'px';

				getActiveIndex();
			}

			function onMouseUp() {
				document.removeEventListener('pointerup', onMouseUp);
				document.removeEventListener('pointermove', onMouseMove);
			}

			function getActiveIndex() {
				const count = inner.childNodes.length;
				const elWidth = Math.round(inner.scrollWidth / count);
				setActiveIndex(Math.round((wrapper.offsetLeft - inner.offsetLeft) / elWidth));
			}
		}

		return () => inner.removeEventListener('mousedown', onMouseDown);
	}, [wrapperRef, innerRef]);

	return {activeIndex, alreadyProcessed, setAlreadyProcessed};
}