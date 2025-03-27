import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { TimePicker, useTimePicker } from "@/components/shared/time-picker";

type PropType = {
    loop?: EmblaOptionsType["loop"]
};

const EmblaCarousel: React.FC<PropType> = () => {

    const timePicker = useTimePicker({});

    return (
        <div>
            <TimePicker
                controls={timePicker}
                label={"Hr"}
            />
        </div>
    );
};

export default EmblaCarousel;
