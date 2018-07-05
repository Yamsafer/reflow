import {SelectorType} from './selector-types'

export
interface Element {
  id: string
  selector: string
  selectorType?: SelectorType
  isAbsolute?: boolean
}
