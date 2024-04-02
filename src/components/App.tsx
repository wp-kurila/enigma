import React, { useCallback, useState } from 'react';

import styles from './app.css';
import {Outlet, Link} from 'react-router-dom';

const App: React.FC = (): React.ReactElement => {
	const [count, setCount] = useState<number>(0);

	const handleCount = useCallback(() => {
		setCount(prev => prev+=1);
	}, [])

	return (
		<div>
			<Link to={'/about'}>about</Link>
			<br/>
			<Link to={'/shop'}>shop</Link>
			<div>Hello React</div>
			<div className={styles.value}>count: {count}</div>
			<button className={styles.button} onClick={handleCount}><span>+</span></button>
			<Outlet />
		</div>
	)
}

export default App;