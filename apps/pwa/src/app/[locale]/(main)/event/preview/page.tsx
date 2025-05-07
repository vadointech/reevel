import { Header } from "@/components/shared/header";
import styles from "./styles.module.scss";
import { EventPreview } from "./_components/event-preview";




export default async function Page() {
    return (
        <>
            <EventPreview />
        </>
    );
};