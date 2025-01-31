const {
    HtmlRspackPlugin,
    container: { ModuleFederationPlugin },
} = require('@rspack/core');

const path = require('path');
const deps = require('./package.json').dependencies;
module.exports = {
    entry: './src/index',
    mode: 'development',
    target: 'web',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
        port: 3002,
    },
    output: {
        publicPath: 'auto',
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'builtin:swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'ecmascript',
                                jsx: true,
                            },
                            transform: {
                                react: {
                                    runtime: 'automatic',
                                },
                            },
                        },
                    },
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'app2',
            filename: 'remoteEntry.js',
            exposes: {
                './Widget': './src/Widget',
            },
            shared: {
                moment: deps.moment,
                'react/jsx-dev-runtime': {},
                react: {
                    requiredVersion: deps.react,
                    import: 'react',
                    shareKey: 'react',
                    shareScope: 'default',
                    singleton: true,
                },
                'react-dom': {
                    requiredVersion: deps['react-dom'],
                    singleton: true,
                },
            },
        }),
        new HtmlRspackPlugin({
            template: './public/index.html',
        }),
    ],
};
