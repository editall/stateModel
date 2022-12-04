import {ViewModel} from "./ViewModel";
import {useState} from "react";

export function useViewModel<T extends ViewModel>(vmType: { new(...arg:any): T }, ...arg:any): T {
    let [model, setModel] = useState<T | undefined>(undefined);
    const [, rerender] = useState(0);
    if (!model) {
        model = new vmType(...arg);
        model.init(rerender);
        setModel(model);
    }
    return model;
}