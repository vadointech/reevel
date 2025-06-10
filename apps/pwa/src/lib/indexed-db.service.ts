import { get, set, del, update } from "idb-keyval";

class IndexedDbService {
    async setItem<T>(key: string, value: T): Promise<void> {
        try {
            return set(key, value);
        } catch (error) {
            console.error(`Failed to set value for key: ${key}. Stack:`, error);
        }
    }
    async getItem<T>(key: string): Promise<T | null> {
        try {
            const value = await get<T>(key);
            if(value) return value;
            return null;
        } catch (error) {
            console.error(`Failed to get value for key: ${key}. Stack:`, error);
            return null;
        }
    }

    async updateItem<T>(key: string, value: T): Promise<void> {
        try {
            await update<T>(key, (prevValue) => {
                if(typeof prevValue === "object") {
                    return { ...prevValue, ...value };
                }
                return value;
            });
        } catch (error) {
            console.error(`Failed to update value for key: ${key}. Stack:`, error);
        }
    }

    async removeItem(key: string): Promise<void> {
        try {
            return del(key);
        } catch (error) {
            console.error(`Failed to remove value for key: ${key}. Stack:`, error);
        }
    }
}

export const indexedDbService = new IndexedDbService();