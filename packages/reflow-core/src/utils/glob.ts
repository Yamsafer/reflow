import * as glob from 'glob'
import {promisify} from 'util'

export
type Pattern = string

export
type GlobObject = {
  pattern: Pattern,
  globOptions?: any
}

export
const createGlobObject = (glob: Pattern | GlobObject): GlobObject => {
  return typeof glob === "string"? { pattern: glob } : glob;
}

export
const globAsync = promisify(glob);
