import { selectorTypes } from './selector-types';
export interface sectionDescriptor {
    selectorType?: selectorTypes;
    selector: string;
}
export interface section {
    [elementName: string]: sectionDescriptor;
}
export declare class Section {
    id: string;
    descriptor: sectionDescriptor;
    constructor(id: string, descriptor: sectionDescriptor);
}
export declare const createSection: (sectionId: string, descriptor: sectionDescriptor) => Section;
