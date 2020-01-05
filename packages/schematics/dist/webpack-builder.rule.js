"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("./utils");
function webpackBuilder(options) {
    return (tree, _context) => {
        // Verifying Angular.json
        const { path: workspacePath, workspace } = utils_1.getWorkspace(tree);
        // getting project name
        if (!options.project) {
            if (workspace.defaultProject) {
                options.project = workspace.defaultProject;
            }
            else {
                throw new schematics_1.SchematicsException('No Angular project selected and no default project in the workspace');
            }
        }
        // Validating project name
        const project = workspace.projects[options.project];
        if (!project) {
            throw new schematics_1.SchematicsException('The specified Angular project is not defined in this workspace');
        }
        // Checking if it is application
        if (project.projectType !== 'application') {
            throw new schematics_1.SchematicsException(`@angular-element-variants/builder-webpack requires an Angular project type of "application" in angular.json`);
        }
        // adding builder for serve and build target
        project.architect['build'] = Object.assign(Object.assign({}, project.architect['build']), { builder: '@angular-element-variants/builder-webpack:browser' });
        project.architect['serve'] = Object.assign(Object.assign({}, project.architect['serve']), { builder: '@angular-element-variants/builder-webpack:dev-server' });
        tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
        return tree;
    };
}
exports.webpackBuilder = webpackBuilder;
//# sourceMappingURL=webpack-builder.rule.js.map