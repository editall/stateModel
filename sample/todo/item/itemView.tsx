import {Item} from "./Item";

export const ItemView = (item: Item) => <li className="todo-item" key={item.key}>
    <div className="todo-item-trash" {...item.trash}></div>
    <div className="todo-item-title" {...item.title}></div>
</li>;