"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const add_package_json_rule_1 = require("./add-package-json.rule");
const webpack_builder_rule_1 = require("./webpack-builder.rule");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function ngAdd(optionsSchema) {
    return schematics_1.chain([webpack_builder_rule_1.webpackBuilder(optionsSchema), add_package_json_rule_1.addPackageJsonDependencies()]);
}
exports.ngAdd = ngAdd;
//# sourceMappingURL=index.js.map