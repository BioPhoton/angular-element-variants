module.exports = {
  name: 'integration-helper',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/integration-helper',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
