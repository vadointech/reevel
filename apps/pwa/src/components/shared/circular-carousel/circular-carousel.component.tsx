"use client";

import { forwardRef, ReactNode, RefObject, useEffect, useImperativeHandle, useRef } from "react";
import { Carousel, Handlers, ICarousel, Plugin } from "./circular-carousel";
import { Wheel, WheelRef } from "./wheel";
import useEmblaCarousel from "embla-carousel-react";
import { onChange, onPointerUp, onScroll } from "./circular-carousel.handlers";

import styles from "./styles.module.scss";

export namespace CircularCarousel {
    export type Props = Handlers & {
        slides: ReactNode[];
        slideWidth: number;
        slideHeight: number;
        plugins?: Plugin[],
        externalController?: RefObject<ICarousel | null>
    };
}

export const CircularCarousel = ({
    slides,
    slideWidth,
    slideHeight,
    plugins,
    externalController,
    ...handlers
}: CircularCarousel.Props) => {
    const wheel = new Wheel({
        items: slides,
        itemWidth: slideWidth,
        itemHeight: slideHeight,
    });

    const wheelRef = useRef<WheelRef>({
        wheel: null,
        wheelItem: [],
    });
  
    const [sliderRef, emblaApi] = useEmblaCarousel({
        loop: true,
        axis: "x",
        direction: "ltr",
        align: "center",
        dragFree: true,
        watchSlides: false,
    });

    useEffect(() => {
        if(!emblaApi) return;

        const carousel = new Carousel({
            api: emblaApi,
            wheel,
            wheelRef,
            plugins,
            handlers,
        });



        if(externalController) {
            externalController.current = carousel;
        }

        emblaApi.on("pointerUp", () => onPointerUp(carousel));
        emblaApi.on("scroll", () => onScroll(carousel));
        emblaApi.on("reInit", () => onScroll(carousel));
        emblaApi.on("select", () => onChange(carousel));

        onScroll(carousel);
    }, [emblaApi]);
  

    return (
        <div
            className={styles.wrapper}
            style={{
                height: wheel.radius * 2,
                width: wheel.radius * 2,
                marginTop: wheel.itemHeight / 2,
                marginBottom: wheel.itemHeight / 2,
            }}
        >
            <div
                className={styles.scene}
                style={{
                    width: wheel.radius * 2,
                    height: wheel.radius * 2,
                }}
            >
                <CarouselComponent ref={sliderRef} {...wheel} />
                <WheelComponent ref={wheelRef} {...wheel} />
            </div>
        </div>
    );
};

const WheelComponent = forwardRef<WheelRef, Wheel>((wheel, ref) => {

    const wheelRef = useRef<HTMLDivElement>(null);
    const wheelItemRefs = useRef<Array<HTMLDivElement | null>>([]);

    useImperativeHandle(ref, () => ({
        get wheel() {
            return wheelRef.current;
        },
        get wheelItem() {
            return wheelItemRefs.current;
        },
    }));

    return (
        <div
            ref={wheelRef}
            className={styles.wheel}
            style={{
                width: wheel.radius * 2,
                height: wheel.radius * 2,
                rotate: "-90deg",
            }}
        >
            {
                wheel.items.map((item, index) => {
                    const anglePX = (360 / wheel.itemCount) * index;
                    const angleRAD = anglePX * (Math.PI / 180);

                    const x = wheel.radius + wheel.radius * Math.cos(angleRAD);
                    const y = wheel.radius + wheel.radius * Math.sin(angleRAD);

                    return (
                        <div
                            ref={(el) => {
                                wheelItemRefs.current[index] = el;
                            }}
                            key={index}
                            className={styles.wheel__item}
                            style={{
                                top: `${y}px`,
                                left: `${x}px`,
                                width: wheel.itemWidth,
                                rotate: `${anglePX + 90}deg`,
                                translate: "-50% -50%",
                            }}
                        >
                            { item }
                        </div>
                    );
                })
            }
        </div>
    );
});

const CarouselComponent = forwardRef<HTMLDivElement, Wheel>((wheel, ref) => {
    return (
        <div
            className={styles.carousel}
            style={{
                width: wheel.radius * 2,
                height: wheel.radius * 2,
            }}
        >
            <div
                ref={ref}
                className={styles.carousel__root}
            >
                <div
                    className={styles.carousel__container}
                >
                    {
                        wheel.items.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    width: wheel.itemWidth,
                                    minWidth: wheel.itemWidth,
                                }}
                            >
                                { item }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
});