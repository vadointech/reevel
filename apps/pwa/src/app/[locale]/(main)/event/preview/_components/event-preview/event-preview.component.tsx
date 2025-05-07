"use client"

import { Header } from "@/components/shared/header"
import { useEventStore } from "@/features/event"

import styles from "./styles.module.scss"
import { useRouter } from "next/navigation"
import { Container } from "@/components/ui"

export namespace EventPreview {
    export type Props = {

    }
}


export const EventPreview = ({

}: EventPreview.Props) => {
    const eventStore = useEventStore()
    const router = useRouter()

    return (
        <Container>
            <Header
                title="Event preview"
                size="large"
                onControlLeftClick={() => router.back()}
                className={styles.page__header}
            ></Header>
        </Container>
    )
}