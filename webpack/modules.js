/**@format */

const path = require("path");

module.exports = [
    {
        test: /\.tsx$/,
        use: [
            {
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                corejs: "3",
                                useBuiltIns: "usage",
                            },
                        ],
                    ],
                },
            },
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
            },
        ],
        exclude: /node_modules/,
    },
    {
        test: /\.(jpe?g|gif)$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    name: "images/[name]-[hash:16].[ext]",
                },
            },
        ],
        include: [path.resolve(__dirname, "../src/shell/ui")],
    },
    {
        test: /\.png$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 1024 * 200,
                    name: "images/icon/[name]-[hash:16].png",
                },
            },
        ],
        include: [path.resolve(__dirname, "../src/shell/ui"), path.resolve(__dirname, "../src/resource")],
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: "svg-inline-loader",
            },
        ],
        include: [path.resolve(__dirname, "../src/shell/ui"), path.resolve(__dirname, "../src/resource")],
    },
];
