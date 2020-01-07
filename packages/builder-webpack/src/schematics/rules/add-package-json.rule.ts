import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from 'schematics-utilities';

/*
*
 const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: '~0.0.0',
        name: '@angular-element-variants/core',
      }
    ];
* */
export function addPackageJsonDependencies(options: unknown, dependencies: NodeDependency[]): Rule {
  return (host: Tree, context: SchematicContext) => {

    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
      context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
    });

    return host;
  };
}
