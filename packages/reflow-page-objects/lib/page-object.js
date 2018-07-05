"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var section_1 = require("./section");
var PageObject = /** @class */ (function () {
    function PageObject(pageObject) {
        this.pageObject = pageObject;
        // Object.entries(pageObject.sections).forEach([sectionName, section] => {
        //   sectionName
        // })
        this.sections = Object
            .entries(this.pageObject.sections)
            .reduce(function (acc, _a) {
            var id = _a[0], desc = _a[1];
            var _b;
            return (__assign({}, acc, (_b = {}, _b[id] = section_1.createSection(id, desc), _b)));
        }, {});
    }
    return PageObject;
}());
exports.PageObject = PageObject;
/*

const pageProxy = {
  get: function(target, prop, receiver) {
    if (prop === 'secret') {
      return `${target.secret.substr(0, 4)} ... shhhh!`;
    } else {
      return Reflect.get(...arguments);
    }
  }
};

client.page = new Proxy({}, pageProxy);

pageObjectDescriptors.forEach(pageObjectDescriptor => {
  if(pageObjectDescriptor.id) {
    throw new Error(`Duplicate pageObject id ${pageObject.id}`);
  }
  const pageObject = new PageObject(pageObjectDescriptor);
  client.page[pageObjectDescriptor.id] = pageObject;
})


client.page =
const {
  gallery,
} = client.page.hotelPage;

gallery.closeButton
{
  selectorType: "",
  selector: "",
}
gallery
{
  sections
}
{}
gallery.click()

*/
