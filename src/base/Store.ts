export class Store<T> {
    private readonly _key: string;
    private readonly _defaultValue: T;
    private readonly _storage = sessionStorage;

    constructor(key: string, defaultValue: T) {
        this._key = key;
        this._defaultValue = defaultValue;
    }

    public save(data:string) {
        this._storage.setItem(this._key, data)
    }

    public saveT(data:T){
        this.save(JSON.stringify(data))
    }

    public read() {
        return this._storage.getItem(this._key) || this._defaultValue;
    }

    public readT(): T {
        const result = this._storage.getItem(this._key)
        if(!result) return this._defaultValue;
        return JSON.parse(result)
    }
}
