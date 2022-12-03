import StateModel from "../src/StateModel";

export class ItemModel extends StateModel{
    constructor(parent:TestModel) {
        super();
        this.#parent = parent;
    }
    #parent:TestModel;
    key = "";
    children = "";
    STYLE = "background:#ffF;color:@color@";
    onClick = ()=>this.#parent.removeItem(this);
}
export class TestModel extends StateModel{
    username = new UserName();
    #items:ItemModel[] = [];
    #isInited = false;
    load = async()=>{
        if(this.#isInited) return;
        this.#isInited = true;
        const {title, items} = await (await fetch("rsc.json")).json();
        this.username.children = title;
        this.#items = items.map((it:any)=>{
            const item = new ItemModel(this);
            item.init(this.update);
            item.key = it.key;
            item.children = `${it.title} [${it.value}]`;
            item.STYLE = item.STYLE.replace("@color@", it.color);
            return item;
        });
    };
    removeItem = (item:ItemModel)=>{
        const idx = this.#items.indexOf(item);
        if(idx == -1) return;
        this.#items.splice(idx, 1);
        this.update();
    };
    addItem = (item:ItemModel)=>{
        this.#items.push(item);
        this.update();
    };
    list = (f:(item:ItemModel)=>JSX.Element)=>{
        return <>{
            this.#items.map(item=>f(item))
        }</>;
    };
    /*override before(key:string, oldValue:any, newValue:any){
        console.log(key, oldValue, newValue);
    }*/
}

class UserName extends StateModel{
    children = "no name";
    STYLE = "background:#ff0;color:#000";
    onClick = ()=>this.children = "hika!!";
}

