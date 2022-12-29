export class ViewModel {
    get parent():ViewModel|null;
    parentAs<T extends ViewModel>(type:{new (...arg:any):T}):T|null;
    get rerender():()=>void;
    protected beforeSet(key:string, oldValue:any, newValue:any);
    protected afterInit();
    init(rerender:((value:any)=>void) | ViewModel);
}
export class ListModel<T> extends ViewModel {
    constructor(...arg: T[]);
    add(...items: T[]): ListModel<T>;
    addAt(index: number, ...items: T[]): ListModel<T>;
    remove(item: T): ListModel<T>;
    removeAt(index: number, count: number = 1): ListModel<T>;
    indexOf(item: T): number;
    map<R>(f:(item:T, index?:number, target?:T[])=>R):R[];
}
export function listVM<T>(...items:T[]):ListModel<T>;