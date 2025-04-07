"use client"

import styles from "./styles.module.scss"

import cx from "classnames"
import { Poster } from "../../../_components/poster";
import { observer } from "mobx-react-lite";
import { usePosterPicker } from "@/features/event/hooks/use-poster-picker.hook";
import { useEventStore } from "@/features/event";

export namespace PosterPicker {
    export type Props = {
        defaultPosters: string[]
    };
}

export const PosterPicker = observer(({
    defaultPosters,
    ...props
}: PosterPicker.Props) => {

    const { posters, handlePickPoster } = usePosterPicker(defaultPosters)

    const eventStore = useEventStore()

    return (
        <div className={cx(styles.section)} {...props}>
            <div className={styles.section__posters}>
                {posters.map((item, i) => (
                    <PosterItem
                        handlePickPoster={handlePickPoster}
                        poster={item}
                        selected={eventStore.poster == item}
                        key={i}
                    />
                ))}
            </div>
        </div>
    )
});

const PosterItem = observer((
    { selected, handlePickPoster, poster }: {
        selected: boolean;
        handlePickPoster: (poster: string) => void;
        poster: string;
    }
) => {
    return (
        <Poster
            size="default"
            selected={selected}
            src={poster}
            onClick={() => handlePickPoster(poster)}
        />
    );
});