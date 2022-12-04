import {ViewModel} from "../src/viewModel/ViewModel";
import {KeyboardEvent} from "react";
import {Item} from "./Item";
import {textVM} from "../src/viewModel/TextModel";
import {AS} from "../src/util/AS";

export class Todo extends ViewModel{
    title = textVM();
    newItem = new NewItem();
    #items:Item[] = [];
    #isInited = false;
    async load(){
        if(this.#isInited) return;
        this.#isInited = true;
        const {title, items} = await (await fetch("rsc.json")).json();
        this.title.children = title;
        this.#items = items.map((it:any)=>{
            const item = new Item();
            item.init(this);
            item.setData(it);
            return item;
        });
    }
    removeItem(item:Item){
        const idx = this.#items.indexOf(item);
        if(idx == -1) return;
        this.#items.splice(idx, 1);
        this.rerender();
    }
    addItem(item:Item){
        item.init(this);
        this.#items.push(item);
        this.rerender();
    }
    list<T>(f:(item:Item)=>T):T[]{
        return this.#items.map(item=>f(item));
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
