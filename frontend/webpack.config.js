const CopyPlugin = require("copy-webpack-plugin");
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
            '@app': path.resolve(__dirname, 'src/app/'),
            '@entities': path.resolve(__dirname, 'src/entities/'),
            '@features': path.resolve(__dirname, 'src/features/'),
            '@shared': path.resolve(__dirname, 'src/shared/'),
            '@pages': path.resolve(__dirname, 'src/pages/'),
            '@widgets': path.resolve(__dirname, 'src/widgets/'),
            '@processes': path.resolve(__dirname, 'src/processes/'),
        },
        plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
        new Dotenv(),
        new CopyPlugin({
            patterns: [
                { from: "public", to: "" },
            ],
        }),
    ],
    devServer: {
        static: path.resolve(__dirname, "dist"),
        compress: true,
        port: 5173,
        historyApiFallback: true,
        hot: true,
    },
};
