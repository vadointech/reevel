type ContextConfig = {
    swVersion: string;
    cacheEnabled: boolean;
};

export class Context {
    private _lastInvalidationTime: number;

    private _swVersion: string;
    private _cacheEnabled: boolean;
    private _cacheTimestampKey: string;

    constructor(config: ContextConfig) {
        this._lastInvalidationTime = Date.now();

        this._swVersion = config.swVersion;
        this._cacheEnabled = config.cacheEnabled;
        this._cacheTimestampKey = "X-SW-Cached-At";
    }

    get lastInvalidationTime() {
        return this._lastInvalidationTime;
    }

    set lastInvalidationTime(value: number) {
        this._lastInvalidationTime = value;
    }

    get cacheEnabled() {
        return this._cacheEnabled;
    }

    set cacheEnabled(value: boolean) {
        this._cacheEnabled = value;
    }
}

export function createContext(config: ContextConfig) {
    return new Proxy(new Context(config), {
        get(target, prop) {
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            Reflect.set(target, prop, value);
            return true;
        },
    });
}