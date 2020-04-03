module.exports = {
  name: 'angular-element-variants-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/angular-element-variants-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
