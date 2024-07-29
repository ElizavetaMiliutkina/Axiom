const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean:true
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, 'src/assets'),
        }
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public", to: "" }
            ],
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        port: 3000
    }
}