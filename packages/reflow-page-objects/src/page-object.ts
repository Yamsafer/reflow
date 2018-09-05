import {Element} from './elements'
import {Command} from './commands'
import {SelectorType} from './selector-types'

export
interface PageObjectDescriptor {
  id: string
  selector?: string
  selectorType?: SelectorType
  sections?: PageObjectDescriptor[]
  elements?: Element[]
  commands?: Command[]
}

export
interface PageObject {
  id: string
  sections: {[id: string]: PageObject}
  elements: {[id: string]: Element}
  commands: {[id: string]: Command}
  raw: PageObjectDescriptor
  element(id: string) : Element
  section(id: string) : PageObject
  command(id: string, ...args: any[]) : Promise<any>
}


const Just = (arr: any[] | undefined): any[] => Array.isArray(arr)? arr : [];

const assignIdAsKey = (acc: object, item: {id: string}): object => Object.assign(acc, {[item.id]: item})

// const pageObjectHandlers = {
//   get: function(target:any, prop:string, receiver: any) {
//     const element = target.element(prop);
//     return element || Reflect.get(target, prop, receiver);
//   }
// };
const bindContext = function(context: PageObject) {
  return function(command: Command) {
    return Object.assign({}, {
      ...command,
      command: (...args: any[]) => Promise.resolve(command.command.apply(context, args))
    });
  }
}

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
    this.commands = Just(rawPageObject.commands).map(bindContext(this)).reduce(assignIdAsKey, {})

    // return new Proxy(this, pageObjectHandlers);
    // Object.keys(this.elements).forEach(elementId => {
    //   this[elementId] = this.element(elementId);
    // })
  }
  command(id: string, ...args: any[]) {
    return this.commands[id].command(...args)
    // return this.commands[id].command
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
