"use client";

import { useEffect, useRef, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export function useDebounceCallback(delay: number = 1000) {
    const lastTimeout = useRef<NodeJS.Timeout | null>(null);

    const debouncedCallback = <T>(callback: () => Promise<T>): Promise<T> => {
        if (lastTimeout.current) {
            clearTimeout(lastTimeout.current);
        }

        return new Promise<T>((resolve, reject) => {
            lastTimeout.current = setTimeout(() => {
                callback().then(resolve).catch(reject);
            }, delay);
        });
    };

    useEffect(() => {
        return () => {
            if (lastTimeout.current) {
                clearTimeout(lastTimeout.current);
            }
        };
    }, []);

    return debouncedCallback;
}