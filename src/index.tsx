import React, {Suspense} 	from 'react';
import {createRoot} 		from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Navigate
} 							from 'react-router-dom';

import App					from './components/App';

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
	<RouterProvider router={router} />
);