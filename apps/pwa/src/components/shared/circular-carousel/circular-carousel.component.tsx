"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { CircularCarousel as TCircularCarousel } from "./carousel/types";
import { useWheel } from "./hooks/useWheel";
import { Wheel, WheelRef } from "./wheel";

import styles from "./styles.module.scss";

export namespace CircularCarousel {
    export type Props = {
        carousel: TCircularCarousel
    };
}

export const CircularCarousel = ({ carousel }: CircularCarousel.Props) => {

    const [wheelRef, sliderRef] = useWheel(carousel);

    return (
        <div
            className={styles.wrapper}
            style={{
                height: carousel.wheel.radius * 2,
                width: carousel.wheel.radius * 2,
                marginTop: carousel.wheel.itemHeight / 2,
                marginBottom: carousel.wheel.itemHeight / 2,
            }}
        >
            <div
                className={styles.scene}
                style={{
                    width: carousel.wheel.radius * 2,
                    height: carousel.wheel.radius * 2,
                }}
            >
                <CarouselComponent ref={sliderRef} {...carousel.wheel} />
                <WheelComponent ref={wheelRef} {...carousel.wheel} />
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