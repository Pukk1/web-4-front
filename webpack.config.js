const path = require("path");
const webpack = require("webpack");
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = (env, argv) => {
    console.log(`This is the Webpack 'mode': ${argv.mode}`);
    return {
        entry: "./src/client/index" + (argv.mode === 'production' ? '.prod.tsx' : '.dev.tsx'),
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel-loader"
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            ]
        },
        resolve: {extensions: [".ts", ".tsx", ".js", ".jsx"]},
        output: {
            path: path.resolve(__dirname, "dist/"),
            publicPath: "/dist/",
            filename: "bundle.js"
        },
        devServer: {
            static: path.join(__dirname, "public/"),
            devMiddleware: {
                publicPath: "/dist/",
            },
            historyApiFallback: true,
            port: 3000,
            hot: "only"
        },
        plugins: [new webpack.HotModuleReplacementPlugin(), new LoadablePlugin()]
    }
};