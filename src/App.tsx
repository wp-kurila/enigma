import { FC, ReactElement, useEffect, useRef } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import About from './components/About';
import Information from './components/Information';
import Layouts from './components/Layouts';
import Location from './components/Location';
import Conveniences from './components/Conveniences';
import Interior from './components/Interior';
import Questions from './components/Questions';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

import FadeInWithScroll from './ui-kit/FadeInWithScroll';

import styles from './app.module.css';

const App: FC = (): ReactElement => {
	const ref = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLDivElement>(null);
	const layoutsRef = useRef<HTMLDivElement>(null);
	const questionsRef = useRef<HTMLDivElement>(null);
	const contactsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={styles.app} ref={ref}>
			<Header about={aboutRef} roomsLayout={layoutsRef} questions={questionsRef} contacts={contactsRef} />
			<FadeInWithScroll>
				<Banner />
			</FadeInWithScroll>
			<FadeInWithScroll>
				<About ref={aboutRef} />
			</FadeInWithScroll>
			<FadeInWithScroll>
				<Information />
			</FadeInWithScroll>
			<FadeInWithScroll>
				<Location />
			</FadeInWithScroll>
			<FadeInWithScroll>
				<Conveniences />
			</FadeInWithScroll>
			<FadeInWithScroll>
				<Interior />
			</FadeInWithScroll>
			<FadeInWithScroll>
				<Layouts ref={layoutsRef} />
			</FadeInWithScroll>
			<FadeInWithScroll>
				<Questions ref={questionsRef} />
			</FadeInWithScroll>
			<FadeInWithScroll>
				<Contacts ref={contactsRef} />
			</FadeInWithScroll>
			<FadeInWithScroll>
				<Footer about={aboutRef} roomsLayout={layoutsRef} questions={questionsRef} contacts={contactsRef} />
			</FadeInWithScroll>

			{/* <Suspense fallback={'Loading...'}><FadeInWithScroll><LazyInputs /></FadeInWithScroll></Suspense> */}
		</div>
	);
};

export default App;
