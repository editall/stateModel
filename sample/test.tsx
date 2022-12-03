import useStateModel from "../src/useStateModel";
import TestModel from "./TestModel";

const Test = (prop:any)=>{
    const $:TestModel = useStateModel(TestModel);
    //$.load();
    return <div>
            <div {...$.username}/>
    </div>
}
export default Test;