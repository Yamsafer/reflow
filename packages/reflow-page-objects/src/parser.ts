import {PageObject} from './page-object'

interface ParsePageObject {
  (rawPageObject: PageObject): PageObject;
}

export
const parsePageObject:ParsePageObject = (rawPageObject) => {
    return rawPageObject;
}
