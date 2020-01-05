"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function getWorkspace(host) {
    const possibleFiles = ['/angular.json', '/.angular.json'];
    const path = possibleFiles.filter(path => host.exists(path))[0];
    const configBuffer = host.read(path);
    if (configBuffer === null) {
        throw new schematics_1.SchematicsException(`Could not find angular.json`);
    }
    const content = configBuffer.toString();
    let workspace;
    try {
        workspace = core_1.parseJson(content, core_1.JsonParseMode.Loose);
    }
    catch (e) {
        throw new schematics_1.SchematicsException(`Could not parse angular.json: ` + e.message);
    }
    return {
        path,
        workspace,
    };
}
exports.getWorkspace = getWorkspace;
//# sourceMappingURL=utils.js.map