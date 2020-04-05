import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join('collection.json');


describe('ng-add', () => {
  xit('works', () => {
    const runner = new SchematicTestRunner('builder-webpack/schematics', collectionPath);
    const tree = runner.runSchematic('ng-add', {}, Tree.empty());

    expect(tree.files).toEqual([]);
  });
});
