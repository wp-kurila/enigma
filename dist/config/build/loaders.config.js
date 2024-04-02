import MiniCssExtractPlugin from 'mini-css-extract-plugin';
export default function (options) {
    var isDev = options.mode === 'development';
    var assetLeader = {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
    };
    var cssLoaderModules = {
        loader: "css-loader",
        options: {
            importLoaders: 1,
            modules: {
                localIdentName: '[local]---[hash:base64:5]'
            }
        }
    };
    var postCssLoader = {
        test: /\.css$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderModules,
            "postcss-loader"
        ],
    };
    var tsLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'ts-loader',
            options: {
                transpileOnly: true
            }
        },
    };
    return [assetLeader, postCssLoader, tsLoader];
}
