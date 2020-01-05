import { Tree } from '@angular-devkit/schematics';
import { experimental } from '@angular-devkit/core';
export declare function getWorkspace(host: Tree): {
    path: string;
    workspace: experimental.workspace.WorkspaceSchema;
};
