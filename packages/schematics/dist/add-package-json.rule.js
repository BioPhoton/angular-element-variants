"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_utilities_1 = require("schematics-utilities");
function addPackageJsonDependencies() {
    return (host, context) => {
        const dependencies = [
            {
                type: schematics_utilities_1.NodeDependencyType.Default,
                version: '~0.0.0',
                name: '@angular-element-variants/core',
            },
            {
                type: schematics_utilities_1.NodeDependencyType.Default,
                version: '~0.0.0',
                name: '@angular-element-variants/builder-webpack',
            },
        ];
        dependencies.forEach(dependency => {
            schematics_utilities_1.addPackageJsonDependency(host, dependency);
            context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
        });
        return host;
    };
}
exports.addPackageJsonDependencies = addPackageJsonDependencies;
//# sourceMappingURL=add-package-json.rule.js.map