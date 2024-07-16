const {
    HtmlRspackPlugin,
    container: { ModuleFederationPlugin },
} = require('@rspack/core');

const path = require('path');
const deps = require('./package.json').dependencies;
module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
        port: 3003,
    },
    target: 'web',
    output: {
        publicPath: 'auto',
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
            name: 'app3',
            library: { type: 'var', name: 'app3' },
            filename: 'remoteEntry.js',
            exposes: {
                './Widget': './src/Widget',
                './Other': './src/Other',
            },
            shared: {
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
                }
            },
        }),
        new HtmlRspackPlugin({
            template: './public/index.html',
        }),
    ],
};
