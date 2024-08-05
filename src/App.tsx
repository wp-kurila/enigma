import React, {Suspense, useEffect, useRef} 	from 'react';
import {LazyHeader} 		from './components/Header/index.lazy';
import {LazyBanner} 		from './components/Banner/index.lazy';
import {LazyAbout} 			from './components/About/index.lazy';
import {LazyInformation} 	from './components/Information/index.lazy';
import {LazyLocation} 		from './components/Location/index.lazy';
import {LazyConveniences} 	from './components/Conveniences/index.lazy';
import {LazyInterior} 		from './components/Interior/index.lazy';
import {LazyRoomsLayout} 	from './components/RoomLayouts/index.lazy';
import {LazyQuestions} 		from './components/Questions/index.lazy';
import {LazyInputs} 		from './components/Inputs/index.lazy';
import {LazyContacts} 		from './components/Contacts/index.lazy';
import {LazyFooter} 		from './components/Footer/index.lazy';

import FadeInWithScroll 	from './ui-kit/FadeInWithScroll';

import styles 				from './app.css';

const App: React.FC = (): React.ReactElement => {

	const ref = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLDivElement>(null);
	const roomsLayoutRef = useRef<HTMLDivElement>(null);
	const questionsRef = useRef<HTMLDivElement>(null);
	const contactsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.scrollTo(0, 0); // Прокрутка к верху страницы при загрузке
	}, []);

	return (
		<div className={styles.app} ref={ref}>
			<Suspense fallback={'Loading...'}><LazyHeader about={aboutRef} roomsLayout={roomsLayoutRef} questions={questionsRef} contacts={contactsRef} /></Suspense>
			<Suspense fallback={'Loading...'}><LazyBanner /></Suspense>
			<Suspense fallback={'Loading...'}><FadeInWithScroll><LazyAbout ref={aboutRef} /></FadeInWithScroll></Suspense>
			<Suspense fallback={'Loading...'}><FadeInWithScroll><LazyInformation /></FadeInWithScroll></Suspense>
			<Suspense fallback={'Loading...'}><FadeInWithScroll><LazyLocation /></FadeInWithScroll></Suspense>
			<Suspense fallback={'Loading...'}><FadeInWithScroll><LazyConveniences /></FadeInWithScroll></Suspense>
			<Suspense fallback={'Loading...'}><FadeInWithScroll><LazyInterior /></FadeInWithScroll></Suspense>
			<Suspense fallback={'Loading...'}><FadeInWithScroll><LazyRoomsLayout ref={roomsLayoutRef} /></FadeInWithScroll></Suspense>
			<Suspense fallback={'Loading...'}><FadeInWithScroll><LazyQuestions ref={questionsRef} /></FadeInWithScroll></Suspense>
			{/* <Suspense fallback={'Loading...'}><FadeInWithScroll><LazyInputs /></FadeInWithScroll></Suspense> */}
			<Suspense fallback={'Loading...'}><FadeInWithScroll><LazyContacts ref={contactsRef} /></FadeInWithScroll></Suspense>
			<Suspense fallback={'Loading...'}><LazyFooter about={aboutRef} roomsLayout={roomsLayoutRef} questions={questionsRef} contacts={contactsRef} /></Suspense>
		</div>
	)
}

export default App;