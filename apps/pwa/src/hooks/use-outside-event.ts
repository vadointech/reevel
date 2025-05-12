import { type RefObject, useEffect, useRef } from "react";

type OutsideEventParams<T> = {
    activate?: boolean;
    handleEvent: () => void;
    omitElements?: RefObject<T>[];
    omitClassNames?: Array<string | undefined>;
};

export function useOutsideEvent<T extends HTMLElement>(
    events: Array<keyof DocumentEventMap>,
    params: OutsideEventParams<T> = {
        handleEvent: () => {},
        omitElements: [],
        omitClassNames: [],
    },
) {
    const ref = useRef<T>(null);

    const {
        activate = true,
        handleEvent,
        omitElements = [],
        omitClassNames = [],
    } = params;

    useEffect(() => {
        if(!activate) return;
        const eventListener = (e: Event) => {
            const target = e.target as T;

            if(!target || !ref.current) return;

            if(ref.current.contains(target)) return;

            if(omitElements) {
                const contains = omitElements.some(item =>
                    item.current && item.current.contains(target),
                );

                if(contains) return;
            }

            if(omitClassNames) {
                const contains = omitClassNames.some(item =>
                    target.classList.contains(item as string),
                );
                if(contains) return;
            }

            handleEvent();
        };

        events.forEach(eventType => {
            document.addEventListener(eventType, eventListener);
        });

        return () => {
            events.forEach(eventType => {
                document.removeEventListener(eventType, eventListener);
            });
    
        };
    }, [handleEvent, omitElements, omitClassNames, events]);

    return [ref] as const;
}