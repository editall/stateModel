import { SetStateAction } from "react";

export default class StateModel {
    update = ()=>{}
    before(key:string, oldValue:any, newValue:any){}
    init(s:(value: SetStateAction<number>)=>void) {
        let count = 1;
        const state = ()=>s(count++);
        this.update = state;
        Reflect.ownKeys(this).forEach(name=>{
            if(typeof name == "symbol") return;
            // @ts-ignore
            let value = this[name];
            if(value instanceof StateModel) value.init(s);
            Object.defineProperty(this, name, {
                get: () => value,
                set: (v)=>{
                    this.before(name, value, v);
                    value = v;
                    state();
                }
            });
        });
    }
}