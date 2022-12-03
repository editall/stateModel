import useStateModel from "../src/useStateModel";
import {ItemModel, TestModel} from "./TestModel";

export const Test = (prop:any)=>{
    const $:TestModel = useStateModel(TestModel);
    $.load();
    return <div>
            <div {...$.username}/>
        <ul>
            {$.list(Item)}
        </ul>
    </div>
}
const Item = (item:ItemModel)=><li {...item}/>;
