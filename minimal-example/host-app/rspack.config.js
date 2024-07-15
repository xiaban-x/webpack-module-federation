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
        port: 3000,
    },
    output: {
        publicPath: "http://localhost:3000/",
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
            name: "hostApp",
            remotes: {
                remoteApp: "remoteApp@http://localhost:3001/remoteEntry.js",
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
