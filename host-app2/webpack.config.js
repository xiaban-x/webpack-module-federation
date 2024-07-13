const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
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
            name: "hostApp2",
            remotes: {
                remoteApp: "remoteApp@http://localhost:3001/remoteEntry.js",
            },
            shared: {
                react: { singleton: true, eager: true },
                "react-dom": { singleton: true, eager: true },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
