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
        test: /\.(jpe?g|png|gif)$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    name: "[name]-[hash:16].[ext]",
                },
            },
        ],
        include: [path.resolve(__dirname, "../src/shell/ui")],
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: "svg-inline-loader",
            },
        ],
        include: [path.resolve(__dirname, "../src/shell/ui")],
    },
];
