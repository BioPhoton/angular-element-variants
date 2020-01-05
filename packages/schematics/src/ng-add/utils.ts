import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { experimental, JsonParseMode, parseJson } from '@angular-devkit/core';

export function getWorkspace(
  host: Tree
): { path: string; workspace: experimental.workspace.WorkspaceSchema } {
  const possibleFiles = ['/angular.json', '/.angular.json'];
  const path = possibleFiles.filter(path => host.exists(path))[0];

  const configBuffer = host.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find angular.json`);
  }
  const content = configBuffer.toString();

  let workspace: experimental.workspace.WorkspaceSchema;
  try {
    workspace = (parseJson(
      content,
      JsonParseMode.Loose
    ) as {}) as experimental.workspace.WorkspaceSchema;
  } catch (e) {
    throw new SchematicsException(`Could not parse angular.json: ` + e.message);
  }

  return {
    path,
    workspace,
  };
}
