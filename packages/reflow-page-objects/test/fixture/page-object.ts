import {Element} from '@src/elements'
import {PageObjectDescriptor} from '@src/page-object'
import {SelectorType} from '@src/selector-types'

export
const titleElementFixture:Element = {
  id: "title",
  selector: "#title"
}

export
const gallerySectionFixture:PageObjectDescriptor = {
  id: "gallery",
  sections: [{
    id: "navigation",
    selector: "r",
    elements: [{
      id: "next",
      selector: ""
    }]
  }],
  elements: [{
    id: "closeButton",
    selector: "#gallery",
    selectorType: SelectorType.xPath
  }]
}

export
const pageObjectFixture:PageObjectDescriptor = {
  id: "hotel page",
  sections: [
    gallerySectionFixture,
  ],
  elements: [
    titleElementFixture
  ],
}
