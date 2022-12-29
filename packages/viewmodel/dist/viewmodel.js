const f = () => {
};
class i {
  #t;
  get parent() {
    return this.#t;
  }
  parentAs(t) {
    return this.#t instanceof t ? this.#t : null;
  }
  #e = f;
  get rerender() {
    return this.#e;
  }
  beforeSet(t, e, r) {
  }
  afterInit() {
  }
  init(t) {
    let e = 1;
    t instanceof i ? (this.#t = t, this.#e = t.rerender) : this.#e = () => t(e++);
    const r = this.#e;
    Reflect.ownKeys(this).forEach((s) => {
      if (typeof s == "symbol" || s[0] == "_")
        return;
      let n = this[s];
      n instanceof i && n.init(this), Object.defineProperty(this, s, {
        get: () => n,
        set: (a) => {
          this.beforeSet(s, n, a), n = a, r();
        }
      });
    }), this.afterInit();
  }
}
class o extends i {
  #t;
  constructor(...t) {
    super(), this.#t = t;
  }
  afterInit() {
    this.parent && this.#t.forEach((t) => t instanceof i && t.init(this.parent));
  }
  add(...t) {
    return this.#t.push(...t), this.parent && t.forEach((e) => e instanceof i && e.init(this.parent)), this.rerender(), this;
  }
  addAt(t, ...e) {
    return this.#t.splice(t, 0, ...e), this.parent && e.forEach((r) => r instanceof i && r.init(this.parent)), this.rerender(), this;
  }
  remove(t) {
    const e = this.#t.indexOf(t);
    return this.#t.splice(e, 1), this.rerender(), this;
  }
  removeAt(t, e = 1) {
    return this.#t.splice(t, e), this.rerender(), this;
  }
  indexOf(t) {
    return this.#t.indexOf(t);
  }
  map(t) {
    return this.#t.map(t);
  }
}
function c(...h) {
  return new o(...h);
}
export {
  o as ListModel,
  i as ViewModel,
  c as listVM
};
