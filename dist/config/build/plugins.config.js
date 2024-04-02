import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
export default function (options) {
    var mode = options.mode, paths = options.paths;
    var isDev = mode === 'development';
    return [
        new HtmlWebpackPlugin({ template: paths.html }),
        isDev && new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].css'
        })
    ].filter(Boolean);
}
