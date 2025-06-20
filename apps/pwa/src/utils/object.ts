import deepEqual from "fast-deep-equal/es6";

export class ObjectUnique<T extends Record<string, any>> {
    constructor(
        private readonly items: T[],
        private readonly parameter: keyof T,
    ) {}

    public toArray(): T[] {
        return this.items.filter((value, index, array) => (
            index === array.findIndex(v => v[this.parameter] === value[this.parameter])
        ));
    }

    *[Symbol.iterator](): Iterator<T> {
        for(const item of this.toArray()) {
            yield item;
        }
    }
}

export class ObjectDiff<T extends Record<string, any>> {
    private readonly changed: Map<keyof T, T[keyof T]> = new Map();

    /**
     * Creates an instance that compares `initial` and `current` objects,
     * optionally limited to specified `keys`.
     *
     * @param initial - The original object to compare from.
     * @param current - The updated object to compare against.
     * @param keys - Optional array of keys to restrict the comparison.
     */
    constructor(
        private readonly initial: T,
        private readonly current: T,
        private readonly keys?: (keyof T)[],
    ) {
        const fieldKeys = this.keys ?? ([
            ...new Set([
                ...Object.keys(initial),
                ...Object.keys(current),
            ]),
        ] as (keyof T)[]);

        for(const key of fieldKeys) {
            if(!deepEqual(this.current[key], this.initial[key])) {
                this.changed.set(key, this.current[key]);
            }
        }
    }

    /**
     * Returns an object containing only the properties that have changed.
     *
     * @returns {Partial} Object with changed properties and their updated values.
     */
    public toObject(): Partial<T> {
        return Object.fromEntries(this.changed.entries()) as Partial<T>;
    }

    /**
     * Returns an array of keys representing the properties that have changed.
     *
     * @returns {[]} Array of keys for changed properties.
     */
    public get changedKeys(): (keyof T)[] {
        return Array.from(this.changed.keys());
    }

    /**
     * Checks whether any properties have changed.
     *
     * @returns {boolean} True if there is at least one changed property, otherwise false.
     */
    public get hasChanges(): boolean {
        return this.changed.size > 0;
    }

    /**
     * Returns the number of properties that have changed.
     *
     * @returns {number} Count of changed properties.
     */
    public get size(): number {
        return this.changed.size;
    }
}
