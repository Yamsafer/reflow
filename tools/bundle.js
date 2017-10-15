import cp from 'child_process';
import { makeDir } from './lib/fs';

async function bundle() {
  await makeDir('distribution');
  await new Promise((resolve, reject) => {
    cp.spawnSync('yarn', ['build:babel'], { stdio: 'inherit' });
    resolve();
  });
}

export default bundle;