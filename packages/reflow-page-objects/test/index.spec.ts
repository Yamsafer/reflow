import {parsePageObject} from '@src/parser'
import {pageObjectFixture} from './fixture/page-object';

describe("Page Object Parser", function() {
  it("returns a page Object instance", function() {
    const pageObject = parsePageObject(pageObjectFixture)
    expect(pageObject).to.equal(pageObjectFixture)
  })
})
