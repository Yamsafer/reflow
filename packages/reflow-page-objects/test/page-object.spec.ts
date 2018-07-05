/// <reference path="typings/globals.d.ts" />
import {
  createPageObject,
  PageObject,
} from '@src/page-object'

import {
  pageObjectFixture,
  gallerySectionFixture,
  titleElementFixture,
} from './fixture/page-object';

describe("Page Object", function () {
  let pageObject: PageObject;
  before(function() {
    pageObject = createPageObject(pageObjectFixture)
  })

  it("returns section by id", function() {
    const gallerySection:PageObject = pageObject.section("gallery");
    const galleryPageObject:PageObject = createPageObject(gallerySectionFixture);

    expect(gallerySection).to.deep.equal(galleryPageObject)
  })

  it("returns element by id", function() {
    const titleElement = pageObject.element("title");

    expect(titleElement).to.deep.equal(titleElementFixture)
  })
})
