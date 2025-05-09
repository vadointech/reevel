"use client"

import { Header } from "@/components/shared/header"
import { useEventStore } from "@/features/event"

import { useRouter } from "next/navigation"
import { Container } from "@/components/ui"
import { GradientCarousel } from "../gradient-carousel"

import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite"
export namespace EventPreview {
    export type Props = {

    }
}


export const EventPreview = observer(({ }: EventPreview.Props) => {
    const router = useRouter()

    return (

        <>
            <Container>
                <Header
                    title="Event preview"
                    size="large"
                    onControlLeftClick={() => router.back()}
                    className={styles.page__header}
                ></Header>
            </Container>
            <GradientCarousel />
        </>

    )
})