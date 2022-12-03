import StateModel from "../src/StateModel";

class TestModel extends StateModel{
    count = 0;
    inc = ()=>this.count++;
    trigger(key:string, oldValue:any, newValue:any){
        console.log(key, oldValue, newValue);
    }
    title = "";
    #inited = false;
    async load(){
        console.log("load", this.#inited);
        if(this.#inited) return;
        this.#inited = true;
        const {title} = await (await fetch("rsc.json")).json();
        this.title = title;
    }
}

export default TestModel;
