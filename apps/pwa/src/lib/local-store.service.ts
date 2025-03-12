class LocalStoreService {

    getItem<T>(key: string): T | null {
        return this.withLocalStore<T>((store) => {
            const storeData = store.getItem(key);
            return storeData ? JSON.parse(storeData) : null;
        });
    }

    setItem<T>(key: string, value: T): void {
        this.withLocalStore((store) => {
            store.setItem(key, JSON.stringify(value));
        });
    }

    removeItem(key: string): void {
        this.withLocalStore((store) => {
            store.removeItem(key);
        });
    }

    private withLocalStore<T>(func: (store: Storage) => T): T | null {
        if(typeof window !== "undefined") {
            return func(window.localStorage);
        }
        return null;
    }
}

export const localStoreService = new LocalStoreService();