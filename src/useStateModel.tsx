import StateModel from "./StateModel";
import {useState} from "react";

export default function useStateModel<T extends StateModel>(vmType: { new(...arg:any): T }, ...arg:any): T {
    let [model, setModel] = useState<T | undefined>(undefined);
    const [count, counter] = useState(0);
    if (!model) {
        model = new vmType(...arg);
        model.init(counter);
        setModel(model);
    }
    // @ts-ignore
    return model;
}