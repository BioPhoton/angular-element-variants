"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * This is where you define a function that modifies your webpack config
 */
exports.default = (cfg, opts) => {
    cfg.plugins.push(new HtmlWebpackPlugin({
        filename: 'footer.html',
        template: 'src/footer-template.html',
    }));
    return cfg;
};
//# sourceMappingURL=func-webpack.config.js.map