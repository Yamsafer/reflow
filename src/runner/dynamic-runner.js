import fs from 'fs';
import dynamicVM from './dynamic-vm';

const loadFileCode = filePath => fs.readFileSync(filePath, 'utf-8');

const dynamicRunner = (vmOptions={}) => {
  const vm = dynamicVM(vmOptions);
  const fileCodes = {};

  return (filePath, options) => {
    fileCodes[filePath] = fileCodes[filePath] || loadFileCode(filePath);
    const code = fileCodes[filePath];
    return vm.run(filePath, code, options);
  };
};

export default dynamicRunner