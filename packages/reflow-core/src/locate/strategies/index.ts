import {MappingStrategy} from './mapping';
import {RegexStrategy} from './regex'
import {RequireStrategy} from './require'

export {
  Strategy,
  SuitePath,
  SuiteName,
  SuiteMapping,
} from './base'

export
const strategies = {
  MappingStrategy,
  RegexStrategy,
  RequireStrategy,
}
