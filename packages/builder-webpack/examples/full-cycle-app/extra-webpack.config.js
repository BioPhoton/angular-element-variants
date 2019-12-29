"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * This is where you define your additional webpack configuration items to be appended to
 * the end of the webpack config.
 */
exports.default = {
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'footer.html',
            template: 'src/footer-template.html',
        }),
    ],
};
//# sourceMappingURL=extra-webpack.config.js.map