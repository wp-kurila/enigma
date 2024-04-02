export interface IConfigPaths {
	entry: string;
	html: string;
	output: string;
	public: string;
}

export type ConfigMode = 'production' | 'development';

export interface IConfigOptions {
	port: number;
	paths: IConfigPaths;
	mode: ConfigMode;
}