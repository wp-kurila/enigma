import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const path = require('path');
import type { IConfigOptions } from './types/types';

export default function (options: IConfigOptions) {
	const isDev = options.mode === 'development';

	const cssLoaderModules = {
		loader: 'css-loader',
		options: {
			importLoaders: 1,
			modules: {
				localIdentName: '[local]---[hash:base64:5]',
			},
		},
	};

	const postCssLoader = {
		test: /\.css$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			cssLoaderModules,
			{
				loader: 'postcss-loader',
				options: {
					postcssOptions: {
						plugins: [
							require('postcss-import'),
							require('postcss-custom-media'),
							require('postcss-preset-env')({
								stage: 0,
								importFrom: [path.join(__dirname, '../../src/consts.css')],
								features: {
									'nesting-rules': true,
									'custom-media-queries': true,
									'custom-properties': true,
								},
							}),
						],
					},
				},
			},
		],
	};

	return [
		{
			test: /\.(png|svg|jpg|jpeg|gif)$/i,
			type: 'asset/resource',
		},
		{
			test: /\.(woff|woff2|eot|ttf|otf)$/i,
			type: 'asset/resource',
		},
		postCssLoader,
		{
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: {
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
				},
			},
		},
	];
}
