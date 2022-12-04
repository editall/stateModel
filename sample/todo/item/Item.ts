import {ViewModel} from "../../../src/viewModel/ViewModel";
import {Todo} from "../Todo";

export class Item extends ViewModel {

    key = "";
    trash = new ItemTrash();
    title = new ItemTitle();
    #isCompleted = false
    #title = ""

    setData({key, title, isCompleted}: any): Item {
        this.key = key;
        this.#title = title;
        this.#isCompleted = isCompleted;
        this.title.setData(title, isCompleted);
        return this;
    }

    toggle() {
        this.#isCompleted = !this.#isCompleted;
        this.title.setData(this.#title, this.#isCompleted);
    }

    remove() {
        this.parentAs(Todo)?.removeItem(this);
    }
}
class ItemTitle extends ViewModel{
    STYLE = "";
    children = "";
    setData(title:string, isCompleted:boolean){
        this.children = title;
        this.STYLE = isCompleted ? "text-decoration:line-through" : "";
    }
    onClick = ()=>this.parentAs(Item)?.toggle();
}
class ItemTrash extends ViewModel{
    children = "🗑️";

    onClick = ()=>this.parentAs(Item)?.remove();
}