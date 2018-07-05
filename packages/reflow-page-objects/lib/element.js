"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Element = /** @class */ (function () {
    function Element(name, selector, selectorType) {
        this.id = name;
        if (!selector) {
            throw Error("Element " + name + " has invalid selector.");
        }
        this.selector = selector;
        this.selectorType = selectorType;
    }
    return Element;
}());
exports.Element = Element;
