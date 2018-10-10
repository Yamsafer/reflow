import * as vm from 'vm'
import {readFile} from 'fs'
import {promisify} from 'util'
const readFileAsync = promisify(readFile);

export
const getFileContent = (filepath: string) => readFileAsync(filepath, 'utf8');

export
const runInSandbox = async function(filePath: string, context: vm.Context) {
  const fileContent:string = await getFileContent(filePath);
  // vm.createContext(context);
  vm.runInNewContext(fileContent, context);
  return context
}
