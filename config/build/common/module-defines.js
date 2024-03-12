/**@format */

const path = require("path");

const PATH_HANDLER = require("./path-handler");
const MineCssExtractPlugin = require("mini-css-extract-plugin");

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
        exclude: /node_modules/,
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
            path.resolve(PATH_HANDLER.WEBPACK_ROOT, "loader/i18nLoader.js"),
        ],
        // exclude: /node_modules/,
    },
    {
        test: /\.less$/i,
        exclude: /(node_modules|bower_components)/,
        use: [MineCssExtractPlugin.loader, "css-loader", "less-loader"],
    },
    {
        test: /\.css$/i,
        exclude: /(node_modules|bower_components)/,
        use: [MineCssExtractPlugin.loader, "css-loader"],
    },
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
        test: /\.(jpe?g)$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    name: "images/[name]-[hash:16].[ext]",
                },
            },
        ],
        include: [PATH_HANDLER.TIANYU_INFRA_ENTRY, PATH_HANDLER.TIANYU_PROJECT_ENTRY, PATH_HANDLER.TIANYU_APPLICATION_ENTRY],
    },
    {
        test: /\.gif$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 1024 * 200,
                    name: "images/imms/[name]-[hash:16].gif",
                },
            },
        ],
        include: [PATH_HANDLER.TIANYU_INFRA_ENTRY, PATH_HANDLER.TIANYU_PROJECT_ENTRY, PATH_HANDLER.TIANYU_APPLICATION_ENTRY],
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
        // include: [path.resolve(PATH_HANDLER.TIANYU_INFRA_ENTRY, "shell/ui/res")],
        include: [PATH_HANDLER.TIANYU_INFRA_ENTRY, PATH_HANDLER.TIANYU_PROJECT_ENTRY, PATH_HANDLER.TIANYU_APPLICATION_ENTRY],
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: "svg-inline-loader",
            },
        ],
        include: [PATH_HANDLER.TIANYU_INFRA_ENTRY, PATH_HANDLER.TIANYU_PROJECT_ENTRY, PATH_HANDLER.TIANYU_APPLICATION_ENTRY],
    },
];
