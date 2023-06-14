const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/client/index" + (this.mode === 'production' ? '.prod.tsx' : '.dev.tsx'),
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
        port: 3000,
        hot: "only"
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};