import webpack 		from 'webpack';
import getDevServer from './devServer.config';
import getResolves 	from './resolves.config';
import getLoaders 	from './loaders.config';
import getPlugins 	from './plugins.config';

import type {IConfigOptions} from './types/types';

export default function(options: IConfigOptions): webpack.Configuration {
	const {mode, paths} = options;
	const isDev = mode === 'development';

	return {
		mode: mode ?? 'development',
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
		devtool: isDev ? 'inline-source-map' : 'source-map',
		devServer: isDev ? getDevServer(options) : undefined
	}
}