import StateModel from "../src/StateModel";

class TestModel extends StateModel{
    count = 0;
    inc = ()=>this.count++;
    trigger(key:string, oldValue:any, newValue:any){
        console.log(key, oldValue, newValue);
    }
}

export default TestModel;
