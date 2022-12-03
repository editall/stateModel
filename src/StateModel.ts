import { SetStateAction } from "react";

export default class StateModel {
    trigger(key:string, oldValue:any, newValue:any){}
    init(s: {(value: SetStateAction<number>): void;}) {
        let count = 1;
        const state = ()=>s(count++);
        Reflect.ownKeys(this).forEach(name=>{
            if(typeof name == "symbol" || name[0] == '_') return;
            // @ts-ignore
            let value = this[name];
            Object.defineProperty(this, name, {
                get: () => value,
                set: (v)=>{
                    this.trigger(name, value, v);
                    value = v;
                    state();
                }
            });
        });
    }
}