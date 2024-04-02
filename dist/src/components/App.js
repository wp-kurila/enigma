import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import styles from './app.css';
import { Outlet, Link } from 'react-router-dom';
var App = function () {
    var _a = useState(0), count = _a[0], setCount = _a[1];
    var handleCount = useCallback(function () {
        setCount(function (prev) { return prev += 1; });
    }, []);
    return (_jsxs("div", { children: [_jsx(Link, { to: '/about', children: "about" }), _jsx("br", {}), _jsx(Link, { to: '/shop', children: "shop" }), _jsx("div", { children: "Hello React" }), _jsxs("div", { className: styles.value, children: ["count: ", count] }), _jsx("button", { className: styles.button, onClick: handleCount, children: _jsx("span", { children: "+" }) }), _jsx(Outlet, {})] }));
};
export default App;
