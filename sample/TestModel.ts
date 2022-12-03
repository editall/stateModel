import StateModel from "../src/StateModel";

class TestModel extends StateModel{
    username = new UserName();
    #isInited = false;
    async load(){
        if(this.#isInited) return;
        this.#isInited = true;
        const {title} = await (await fetch("rsc.json")).json();
        this.username.children = title;
    }
    /*override before(key:string, oldValue:any, newValue:any){
        console.log(key, oldValue, newValue);
    }*/
}

class UserName extends StateModel{
    children = "no name";
    STYLE = "background:#ff0;color:#000";
    onClick = ()=>this.children = "hika!!";
}
export default TestModel;
