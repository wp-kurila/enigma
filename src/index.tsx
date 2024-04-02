import React, {Suspense} 	from 'react';
import {createRoot} 		from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider
} 							from 'react-router-dom';
import App					from './components/App';
import {LazyAbout} 			from './pages/About/index.lazy';
import {LazyShop} 			from './pages/Shop/index.lazy';

const root = document.getElementById('root');

if (!root) throw new Error('root not found');

const container = createRoot(root);

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/about',
				element: <Suspense fallback={'Loading...'}><LazyAbout /></Suspense>
			},
			{
				path: '/shop',
				element: <Suspense fallback={'Loading...'}><LazyShop /></Suspense>
			}
		]
	}
]);

container.render(
	<RouterProvider router={router} />
);