import {ViewModel} from "viewmodel";

export class Text extends ViewModel {
    STYLE= "";
    children: string;
    constructor(text: string = "") {
        super();
        this.children = text;
    }
}
export const textVM = (text:string = "")=>new Text(text);