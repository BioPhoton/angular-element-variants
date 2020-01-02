import { syncPeerDependencies } from '../../../tooling/common';

const root = '../';
syncPeerDependencies(root)
  .subscribe();
