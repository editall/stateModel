import { SetStateAction } from "react";

export default class StateModel {
    // @ts-ignore
    #setTriggers:[{(oldValue:any, newValue:any):void}];
    setTriggers(...triggers:[{(oldValue:any, newValue:any):void}]) {
        this.#setTriggers = triggers;
    }
    init(s: {(value: SetStateAction<number>): void;}) {
        let count = 1;
        const state = ()=>s(count++);
        const names = Reflect.ownKeys(this);
        const len = names.length;
        for(let i = 0; i < len; i++){
            const name = names[i];
            if(typeof name == "symbol" || name[0] == '_') continue;
            // @ts-ignore
            let value = this[name];
            Object.defineProperty(this, name, {
                get: () => value,
                set: (v)=>{
                    if(this.#setTriggers) this.#setTriggers.forEach(f=>f(value, v));
                    value = v;
                    state();
                }
            })
        };
    }
}