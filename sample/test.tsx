import useStateModel from "../src/useStateModel";
import TestModel from "./TestModel";

const Test = (prop:any)=>{
    const model:TestModel = useStateModel(TestModel);
    return <div STYLE="background:#ff0;color:#000" onClick={model.inc}>{model.count}</div>;
}
export default Test;