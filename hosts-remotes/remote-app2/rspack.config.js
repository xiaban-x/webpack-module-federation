const {
    HtmlRspackPlugin,
    container: { ModuleFederationPlugin },
} = require('@rspack/core');
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 3003,
    },
    output: {
        publicPath: "http://localhost:3003/",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "remoteApp2",
            filename: "remoteEntry.js",
            exposes: {
                "./Component": "./src/Component",
            },
            shared: {
                react: { singleton: true, eager: true },
                "react-dom": { singleton: true, eager: true },
            },
        }),
        new HtmlRspackPlugin({
            template: "./public/index.html",
        }),
    ],
};
