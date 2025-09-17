import { Navigation, NavigationRoutes } from "@/components/shared/navigation";

export default function CalendarPage() {
    return (
        <>
            <h1>Calendar Page</h1>
            <Navigation currentPage={NavigationRoutes.Calendar} />
        </>
    );
}