import getDevServer from './devServer.config';
import getResolves from './resolves.config';
import getLoaders from './loaders.config';
import getPlugins from './plugins.config';
export default function (options) {
    var mode = options.mode, paths = options.paths;
    var isDev = mode === 'development';
    return {
        mode: mode !== null && mode !== void 0 ? mode : 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name][contenthash].js',
            clean: true
        },
        plugins: getPlugins(options),
        module: {
            rules: getLoaders(options),
        },
        resolve: getResolves(),
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? getDevServer(options) : undefined
    };
}
