import {SetStateAction} from "react";

const defaultRerender = ()=>{};

export class ViewModel {
    //parent
    #parent?:ViewModel;
    get parent(){return this.#parent;}
    parentAs<T extends ViewModel>(type:{new (...arg:any):T}):T|null{
        return this.#parent instanceof type ? this.#parent : null;
    }

    //rerender
    #rerender = defaultRerender;
    get rerender(){return this.#rerender;}

    //override trap
    protected beforeSet(key:string, oldValue:any, newValue:any){}
    protected inited(){}

    init(rerender:((value: SetStateAction<number>)=>void) | ViewModel) {
        let count = 1;
        if(rerender instanceof ViewModel){
            this.#parent = rerender;
            this.#rerender = rerender.rerender;
        } else this.#rerender = ()=>rerender(count++);
        const update = this.#rerender;
        Reflect.ownKeys(this).forEach(name=>{
            if(typeof name == "symbol" || name[0] == "_") return;
            // @ts-ignore
            let value = this[name];
            if(value instanceof ViewModel) value.init(this);
            Object.defineProperty(this, name, {
                get: () => value,
                set: (v)=>{
                    this.beforeSet(name, value, v);
                    value = v;
                    update();
                }
            });
        });
        this.inited();
    }
}
