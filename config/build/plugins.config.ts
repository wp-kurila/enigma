import webpack, {Configuration} from 'webpack';
import path 					from 'path';
import HtmlWebpackPlugin 		from 'html-webpack-plugin';
import MiniCssExtractPlugin 	from 'mini-css-extract-plugin';
import CopyPlugin 				from 'copy-webpack-plugin'

import type {IConfigOptions} 	from './types/types';

export default function(options: IConfigOptions): Configuration['plugins'] {
	const {mode, paths} = options;
	const isDev = mode === 'development';

	return [
		new HtmlWebpackPlugin({template: paths.html, favicon: path.resolve(paths.public, 'favicon.ico')}),
		isDev && new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].css',
			chunkFilename: '[name].[contenthash:8].css'
		}),
		new CopyPlugin({
			patterns: [
			  {from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales')},
			  {from: 'static', to: 'static'}
			],
		  }),
	].filter(Boolean)	
}