
import webpack 		from 'webpack';
import path 		from 'path';
import getBaseConf 	from './config/build/base.config';

import type {IConfigPaths, ConfigMode} 	from './config/build/types/types';

interface IEnv {
	mode: ConfigMode;
	port: number;
}

export default (env: IEnv) => {
	const paths: IConfigPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		public: path.resolve(__dirname, 'public')
	}

	const config: webpack.Configuration = getBaseConf({
		port: env.port ?? 3000,
		mode: env.mode ?? 'development',
		paths
	});

	return config;
}