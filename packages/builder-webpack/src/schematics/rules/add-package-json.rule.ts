import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from 'schematics-utilities';

export function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: '~0.0.0',
        name: '@angular-element-variants/core',
      },
      {
        type: NodeDependencyType.Default,
        version: '~0.0.0',
        name: '@angular-element-variants/builder-webpack',
      },
    ];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
      context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
    });

    return host;
  };
}
