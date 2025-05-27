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
        for (const item of this.toArray()) {
            yield item;
        }
    }
}