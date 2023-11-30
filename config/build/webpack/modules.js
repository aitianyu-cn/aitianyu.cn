/**@format */

const path = require("path");

module.exports.rules = [
    {
        test: /\.ts$/,
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
            "ts-loader",
        ],
        // exclude: /node_modules/,
    },
    {
        test: /\.properties$/,
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
            // "@aitianyu.cn/tianyu-shell/webpack/MsgBundleLoader",
            path.resolve(process.cwd(), "./config/build/loader/i18nLoader.js"),
        ],
    },
    {
        test: /\.less$/i,
        exclude: /(node_modules|bower_components)/,
        use: ["css-loader", "less-loader"],
    },
    {
        test: /\.css$/i,
        exclude: /(node_modules|bower_components)/,
        use: ["css-loader"],
    },
];
