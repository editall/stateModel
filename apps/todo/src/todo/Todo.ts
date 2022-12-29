import {ViewModel} from "viewmodel";
import {KeyboardEvent} from "react";
import {Item} from "./item/Item";
import {textVM} from "viewmodel-react";
import {ListModel} from "viewmodel";

function AS<T>(target: any, type: { new(...arg: any): T }): T | null {
    return target instanceof type ? target as T : null;
}
export class Todo extends ViewModel{
    title = textVM();
    newItem = new NewItem();
    #items = new ListModel<Item>();
    #isInited = false;
    override afterInit(){
        this.#items.init(this);
    }
    async load(){
        if(this.#isInited) return;
        this.#isInited = true;
        const {title, items} = await (await fetch("rsc.json")).json();
        this.title.children = title;
        this.#items.add(...items.map((it:any)=>{
            const item = new Item();
            item.setData(it);
            return item;
        }));
    }
    removeItem(item:Item){
        const idx = this.#items.indexOf(item);
        if(idx == -1) return;
        this.#items.remove(item);
    }
    addItem(item:Item){
        item.init(this);
        this.#items.add(item);
    }
    list<T>(f:(item:Item, index?:number, target?:Item[])=>T):T[]{
        return this.#items.map(f);
    }
}
class NewItem extends ViewModel{
    onKeyDown = (e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter"){
            this.parentAs(Todo)?.addItem((new Item()).setData({
                key:`id:${parseInt(Math.random() * 1000 + "")}`,
                title:AS(e.target, HTMLInputElement)?.value ?? ""
            }));
        }
    }
}
