import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './index.css';
var test = function (num) {
    console.log(num);
};
var About = function () {
    test('321');
    return (_jsxs("div", { className: styles.about, children: ["About", _jsx("div", { className: styles.icon })] }));
};
export default About;
