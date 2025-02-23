const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: "./src/main.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true,
    },
    mode: "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
            "lib": path.resolve(__dirname, "src/lib"),
            "utils": path.resolve(__dirname, "src/utils"),
            "context": path.resolve(__dirname, "src/context"),
            "components": path.resolve(__dirname, "src/components"),
        },
        plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new Dotenv(),
    ],
    devServer: {
        static: path.resolve(__dirname, "dist"),
        compress: true,
        port: 5173,
        historyApiFallback: true,
        hot: true,
    },
};
