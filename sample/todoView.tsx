import {useViewModel} from "../src/viewModel/useViewModel";
import {Todo} from "./Todo";
import {ItemView} from "./itemView";

export const TodoView = (prop:any)=>{
    const test:Todo = useViewModel(Todo);
    test.load();
    const {title, newItem} = test;
    return <section className="todo">
        <h2 {...title}/>
        <div><input {...newItem}/></div>
        <ul>{test.list(ItemView)}</ul>
    </section>
}

