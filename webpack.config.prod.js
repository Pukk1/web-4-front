const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/server/index.ts",
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