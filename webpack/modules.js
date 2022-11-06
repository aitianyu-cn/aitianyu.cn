/**@format */

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
];
