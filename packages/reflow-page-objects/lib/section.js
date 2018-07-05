"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Section = /** @class */ (function () {
    function Section(id, descriptor) {
        this.id = id;
        this.descriptor = descriptor;
    }
    return Section;
}());
exports.Section = Section;
exports.createSection = function (sectionId, descriptor) { return new Section(sectionId, descriptor); };
