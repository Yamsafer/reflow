import { createPageObject } from 'reflow-page-objects'
import * as glob from 'glob'
import path from 'path';



const resolveRawPageObjects = (pageObjectPath: string) => {
  try {
    return require(pageObjectPath).pageObject;
  } catch(err) {
    console.log('Error fetching pageObject:', err);
    return;
  }
}

export
const createPageObjects = (pageObjectGlob: string) => {
  return glob
    .sync(pageObjectGlob)
    .map(resolveRawPageObjects)
    .filter(Boolean)
    .map(createPageObject)
    .reduce((acc, pageObject) => ({...acc, {[pageObject.id]: pageObject}, }), {});
}

export
const pageObjectMixin = {
  initPageObject,
  page(pageName: string) {
    return this.pageObjects[pageName];
  }
}
