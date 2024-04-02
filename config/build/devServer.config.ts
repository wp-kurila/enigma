import type {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import type {IConfigOptions} from './types/types';

export default function (options: IConfigOptions): DevServerConfiguration {
	return {
		port: options.port ?? 3000,
		open: true,
		//nginx
		historyApiFallback: true,
		hot: true
	}
}