import { Carousel } from "../carousel/types";

export function ActiveOpacity({ api, wheelRef }: Carousel) {
    const activeIndex = api.selectedScrollSnap();
    if (wheelRef.current.wheelItem) {
        wheelRef.current.wheelItem.forEach((item, index) => {
            if (item) {
                const opacity = index === activeIndex ? 1 : 0.5;
                item.style.transition = "transform 1s ease-in-out";
                item.style.opacity = `${opacity}`;
            }
        });
    }
}