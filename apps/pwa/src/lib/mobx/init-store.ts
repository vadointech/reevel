export function initStore<T extends object>(store: T, init?: Partial<T>): void {
    if (!init) return;

    (Object.keys(init) as Array<keyof T>).forEach(key => {
        const value = init[key];
        if (value !== undefined) {
            // Type-safe assignment with type assertion
            (store[key] as T[typeof key]) = value as T[typeof key];
        }
    });
}