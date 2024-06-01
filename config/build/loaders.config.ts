import {ModuleOptions} 			from 'webpack';
import MiniCssExtractPlugin 	from 'mini-css-extract-plugin';

import type {IConfigOptions} 	from './types/types';

export default function (options: IConfigOptions): ModuleOptions['rules'] {
	const isDev = options.mode === 'development';

	const assetLoader = {
		test: /\.(png|svg|jpg|jpeg|gif)$/i,
		type: 'asset/resource'
	}

	const assetLoaderFonts = {
		test: /\.(woff|woff2|eot|ttf|otf)$/i,
		type: 'asset/resource',
	}

	const cssLoaderModules = {
		loader: "css-loader",
		options: {
			importLoaders: 1,
			modules: {
				localIdentName: '[local]---[hash:base64:5]'
			}
		}
	}

	const postCssLoader = {
		test: /\.css$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			cssLoaderModules,
			"postcss-loader"
		],
	}

	const tsLoader = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: 'ts-loader',
			options: {
				transpileOnly: true
			}
		},
	}

	return [assetLoader, assetLoaderFonts, postCssLoader, tsLoader];
}