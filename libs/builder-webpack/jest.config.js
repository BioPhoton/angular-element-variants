module.exports = {
  name: 'builder-webpack',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/builder-webpack',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
