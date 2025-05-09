"use client"

import { Header } from "@/components/shared/header"
import { useEventStore } from "@/features/event"

import { useRouter } from "next/navigation"
import { Container } from "@/components/ui"
import { GradientCarousel } from "../gradient-carousel"

import styles from "./styles.module.scss"
export namespace EventPreview {
    export type Props = {

    }
}


export const EventPreview = ({

}: EventPreview.Props) => {
    const eventStore = useEventStore()
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
}