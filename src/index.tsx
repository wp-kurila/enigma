import React 				from 'react';
import {createRoot} 		from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Navigate
} 							from 'react-router-dom';

import App					from './App';

import './i18n';
import './index.css';

const root = document.getElementById('root');

if (!root) throw new Error('root not found');

const container = createRoot(root);

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />
	},
	{
		path: '*',
		element: <Navigate to='/' />
	}
]);

container.render(
	<React.StrictMode>
		<React.Suspense fallback='Loading...'>
			<RouterProvider router={router} />
		</React.Suspense>
	</React.StrictMode>
);