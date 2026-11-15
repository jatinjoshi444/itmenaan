import * as migration_20261115_161623_initial from './20261115_161623_initial';

export const migrations = [
  {
    up: migration_20261115_161623_initial.up,
    down: migration_20261115_161623_initial.down,
    name: '20261115_161623_initial'
  },
];
