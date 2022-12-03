import StateModel from "../src/StateModel";

class TestModel extends StateModel{
    count = 0;
    inc = ()=>this.count++;
}

export default TestModel;
