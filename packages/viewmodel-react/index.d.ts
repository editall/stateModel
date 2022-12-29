import {ViewModel} from "viewmodel";

export function useViewModel<T extends ViewModel>(vmType: { new(...arg:any): T }, ...arg:any): T;
export class Text extends ViewModel {
    STYLE:string;
    children: string;
    constructor(text: string);
}
export const textVM:(text?:string)=>Text;