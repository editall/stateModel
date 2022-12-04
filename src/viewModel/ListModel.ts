import {ViewModel} from "./ViewModel";

export class ListModel<T> extends ViewModel {
    #data: T[];

    constructor(...arg: T[]) {
        super();
        this.#data = arg;
    }

    override inited() {
        if (this.parent) this.#data.forEach(item => item instanceof ViewModel && item.init(this.parent!));
    }

    add(...items: T[]): ListModel<T> {
        this.#data.push(...items);
        if (this.parent) items.forEach(item => item instanceof ViewModel && item.init(this.parent!));
        this.rerender();
        return this;
    }

    addAt(index: number, ...items: T[]): ListModel<T> {
        this.#data.splice(index, 0, ...items);
        if (this.parent) items.forEach(item => item instanceof ViewModel && item.init(this.parent!));
        this.rerender();
        return this;
    }

    remove(item: T): ListModel<T> {
        const index = this.#data.indexOf(item);
        this.#data.splice(index, 1);
        this.rerender();
        return this;
    }

    removeAt(index: number, count: number = 1): ListModel<T> {
        this.#data.splice(index, count);
        this.rerender();
        return this;
    }

    indexOf(item: T): number {
        return this.#data.indexOf(item);
    }
}
export function listVM<T>(...items:T[]){
    return new ListModel(...items);
}