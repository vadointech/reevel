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
            loop: true,
            slideCount: 24,
            itemSize: 32,
            itemCount: 18,
            itemsInView: 4,
            perspective: "left",
            ...wheelParams,
        }),
        handlers,
    );
}