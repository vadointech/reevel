import { IStrategy } from "../src/strategy";

export function applyStrategy<E extends FetchEvent>(event: E, strategy: IStrategy) {
    return strategy.handle(event);
}