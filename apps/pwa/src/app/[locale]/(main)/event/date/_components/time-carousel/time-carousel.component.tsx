import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { IosPickerItem } from './item/item-carousel'

import styles from "./styles.module.scss"

type PropType = {
    loop?: EmblaOptionsType['loop']
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { loop } = props

    return (
        <div className={styles.embla}>
            <IosPickerItem
                slideCount={24}
                perspective="left"
                loop={loop}
                label="Hr"
            />

        </div>
    )
}

export default EmblaCarousel
