import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App';
import { LazyAbout } from './pages/About/index.lazy';
import { LazyShop } from './pages/Shop/index.lazy';
var root = document.getElementById('root');
if (!root)
    throw new Error('root not found');
var container = createRoot(root);
var router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(App, {}),
        children: [
            {
                path: '/about',
                element: _jsx(Suspense, { fallback: 'Loading...', children: _jsx(LazyAbout, {}) })
            },
            {
                path: '/shop',
                element: _jsx(Suspense, { fallback: 'Loading...', children: _jsx(LazyShop, {}) })
            }
        ]
    }
]);
container.render(_jsx(RouterProvider, { router: router }));
