import path from 'path';
import getBaseConf from './config/build/base.config';
export default (function (env) {
    var _a, _b;
    var paths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html')
    };
    var config = getBaseConf({
        port: (_a = env.port) !== null && _a !== void 0 ? _a : 3000,
        mode: (_b = env.mode) !== null && _b !== void 0 ? _b : 'development',
        paths: paths
    });
    return config;
});
