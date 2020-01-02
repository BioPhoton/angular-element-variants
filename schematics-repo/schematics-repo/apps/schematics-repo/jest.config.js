module.exports = {
  name: 'schematics-repo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/schematics-repo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
