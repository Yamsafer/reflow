import { section } from './section';
export interface pageObject {
    id: string;
    sections: section;
}
interface sections {
    [key: string]: section;
}
export interface PageObject {
    pageObject: pageObject;
}
export declare class PageObject {
    pageObject: pageObject;
    sections: sections;
    constructor(pageObject: pageObject);
}
export {};
