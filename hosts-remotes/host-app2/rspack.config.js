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
        port: 3001,
    },
    output: {
        publicPath: "http://localhost:3001/",
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
            name: "hostApp2",
            remotes: {
                remoteApp: "remoteApp@http://localhost:3002/remoteEntry.js",
                remoteApp2: "remoteApp2@http://localhost:3003/remoteEntry.js",
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
