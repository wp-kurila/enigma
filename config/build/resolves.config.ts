import {Configuration} 	from 'webpack';

export default function (): Configuration['resolve'] {
	return {
		extensions: ['.tsx', '.ts', '.js'],
	}
}