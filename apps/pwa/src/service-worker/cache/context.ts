export declare const VERSION: string;

type ContextConfig = {
    swVersion: string;
    cacheEnabled: boolean;
    networkTimeout?: number;
};

export class Context {
    private _lastInvalidationTime: number;

    private readonly _swVersion: string;
    private readonly _cacheEnabled: boolean;
    private readonly _cacheTimestampKey: string;
    private readonly _networkTimeout: number;

    constructor(config: ContextConfig) {
        this._lastInvalidationTime = Date.now();

        this._swVersion = config.swVersion;
        this._cacheEnabled = config.cacheEnabled;
        this._cacheTimestampKey = "X-SW-Cached-At";
        this._networkTimeout = config.networkTimeout || 0;
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

    get cacheTimestampKey() {
        return this._cacheTimestampKey;
    }

    get networkTimeout() {
        return this._networkTimeout;
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

export const ctx = createContext({
    swVersion: VERSION,
    cacheEnabled: true,
});