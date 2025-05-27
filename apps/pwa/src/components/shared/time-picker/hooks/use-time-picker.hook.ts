import { Wheel, WheelParams } from "../wheel/wheel";
import { Handlers } from "@/components/shared/time-picker/carousel/handlers";

type UseTimePickerParams = Partial<WheelParams> & {
    handlers?: Handlers;
};

export class TimePicker {
    constructor(
        public wheel: Wheel,
        public handlers: Handlers,
    ) {}
}

export function useTimePicker({ handlers = {}, ...wheelParams }: UseTimePickerParams): TimePicker {
    return new TimePicker(
        new Wheel({
            slideCount: 0,
            slidesFrom: 0,
            itemSize: 50,
            itemsInView: 3,
            itemCount: 15,
            loop: false,
            perspective: "left",
            startIndex: 0,
            ...wheelParams,
        }),
        handlers,
    );
}