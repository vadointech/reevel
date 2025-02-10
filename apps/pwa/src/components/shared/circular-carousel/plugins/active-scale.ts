import { Carousel } from "../carousel/types";

export function ActiveScale({ api, wheelRef }: Carousel) {
    const activeIndex = api.selectedScrollSnap();
    if(wheelRef.current.wheelItem) {
        wheelRef.current.wheelItem.forEach((item, index) => {
            if(item) {
                const scale = index === activeIndex ? 1.2 : 1; // Активний — більший
                item.style.transition = "transform 0.3s ease-in-out"; // Плавність зміни масштабу
                item.style.transform = `scale(${scale})`;
            }
        });
    }
}