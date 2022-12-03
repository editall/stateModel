import StateModel from "../src/StateModel";

export class TestModel extends StateModel{
    username = new UserName();
    #items:ItemModel[] = [];
    #isInited = false;
    async load(){
        if(this.#isInited) return;
        this.#isInited = true;
        const {title, items} = await (await fetch("rsc.json")).json();
        this.username.children = title;
        this.#items = items.map((it:any)=>{
            const item = new ItemModel(this);
            item.init(this);
            item.setData(it);
            return item;
        });
    }
    removeItem = (item:ItemModel)=>{
        const idx = this.#items.indexOf(item);
        if(idx == -1) return;
        this.#items.splice(idx, 1);
        this.update();
    }
    addItem = (item:ItemModel)=>{
        this.#items.push(item);
        this.update();
    }
    list<T>(f:(item:ItemModel)=>T):T[]{
        return this.#items.map(item=>f(item));
    }
}

class UserName extends StateModel{
    children = "no name";
    STYLE = "background:#ff0;color:#000";
    onClick = ()=>this.children = "hika!!";
}

export class ItemModel extends StateModel{
    constructor(parent:TestModel) {
        super();
        this.#parent = parent;
    }
    setData(it:any){
        this.key = it.key;
        this.children = `${it.title} [${it.value}]`;
        this.STYLE = this.STYLE.replace("@color@", it.color);
    }
    #parent:TestModel;
    key = "";
    children = "";
    STYLE = "background:#ffF;color:@color@";
    onClick = ()=>this.#parent.removeItem(this);
}