/// <reference path="typings/globals.d.ts" />
import {
  createPageObject,
  PageObject,
} from '@src/page-object'

import {
  Command,
} from '@src/commands'

import {
  pageObjectFixture,
  gallerySectionFixture,
  titleElementFixture,
  closeGalleryFixture,
} from './fixture/page-object';

describe("Page Object", function () {
  let pageObject: PageObject;
  before(function() {
    pageObject = createPageObject(pageObjectFixture)
  })

  describe("sections", function() {
    it("returns section by id", function() {
      const gallerySection:PageObject = pageObject.section("gallery");
      const galleryPageObject:PageObject = createPageObject(gallerySectionFixture);

      expect(gallerySection).to.deep.equal(galleryPageObject)
    })
  })

  describe("elements", function() {
    it("returns element by id", function() {
      const titleElement = pageObject.element("title");
      expect(titleElement).to.deep.equal(titleElementFixture)
    })
  })

  describe("commands", function() {
    let closeGallery: Command;
    let result: {this: PageObject, args: any[]};
    const args = [1, 2];

    before(function() {
      closeGallery = pageObject.commands.closeGallery;
      console.log(pageObject.commands);
    })
    it("returns command by id", function() {
      expect(closeGallery.id).to.equal(closeGalleryFixture.id)
    })
    it("returns a promise from executed command", function() {
      expect(closeGallery.command()).to.be.a("promise");
    })
    it("executes command by id", async function() {
      result = await pageObject.command("closeGallery", ...args)
      expect(result).to.be.an("object").and.to.have.all.keys("this", "args")
    })
    it("binds this to pageObject", async function() {
      expect(result.this).to.equal(pageObject);
    })
    it("sends arguments to command", async function() {
      expect(result.args).to.deep.equal(args);
    })
  })
})
