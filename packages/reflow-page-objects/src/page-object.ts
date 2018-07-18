import {Element} from './elements'
import {SelectorType} from './selector-types'

export
interface PageObjectDescriptor {
  id: string
  selector?: string
  selectorType?: SelectorType
  sections?: PageObjectDescriptor[]
  elements?: Element[]
}

export
interface PageObject {
  id: string
  elements: {[id: string]: Element}
  sections: {[id: string]: PageObject}
  raw: PageObjectDescriptor
  element(id: string) : Element
  section(id: string) : PageObject
}

const Just = (arr: Array<any> | undefined) : Array<any> => arr || []

const assignIdAsKey = (acc: object, item: {id: string}) => Object.assign(acc, {[item.id]: item})

const pageObjectHandlers = {
  get: function(target:any, prop:string, receiver: any) {
    const element = target.element(prop);
    return element || Reflect.get(target, prop, receiver);
  }
};


export
class PageObject implements PageObject {
  id: string
  raw: PageObjectDescriptor
  constructor(rawPageObject: PageObjectDescriptor) {
    this.raw = rawPageObject
    this.id = rawPageObject.id

    this.sections = Just(rawPageObject.sections)
      .map(createPageObject)
      .reduce(assignIdAsKey, {})

    this.elements = Just(rawPageObject.elements).reduce(assignIdAsKey, {})

    return new Proxy(this, pageObjectHandlers);
    // Object.keys(this.elements).forEach(elementId => {
    //   this[elementId] = this.element(elementId);
    // })
  }
  section(id: string) {
    return this.sections[id]
  }
  element(id: string) {
    return this.elements[id]
  }
}

interface CreatePageObject {
  (rawPageObject: PageObjectDescriptor) : PageObject
}

export
const createPageObject:CreatePageObject = (rawPageObject) => new PageObject(rawPageObject)
