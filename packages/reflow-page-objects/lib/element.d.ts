import { selectorTypes } from './selector-types';
export interface Element {
    id: string;
    selector: string;
    selectorType: selectorTypes;
}
export declare class Element implements Element {
    id: string;
    selector: string;
    selectorType: selectorTypes;
    constructor(name: string, selector: string, selectorType: selectorTypes);
}
