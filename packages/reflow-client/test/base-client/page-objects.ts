/// <reference path="../typings/globals.d.ts" />

import * as path from 'path';
import {
  // pageObjectMixin,
  createPageObjects,
} from '@src/base/page-objects';

describe("Page Objects", function () {
  before(function() {
    const pageObjectfixturePath = path.join(__dirname, './fixtures/gallery');
    createPageObjects(pageObjectfixturePath);
  })
  describe("creating page objects", function() {
    it("returns a list of page objects from path", function() {

    })
  })
})
