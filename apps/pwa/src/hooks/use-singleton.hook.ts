import { useState } from "react";

export function useSingleton<Class extends object, Args extends any[]>(ObjectClass: new (...args: Args) => Class, ...args: Args) {
    const [controller] = useState(() => new ObjectClass(...args));
    return controller;
}