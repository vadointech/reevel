import { ShareEvent } from "@/components/shared/share-event";


export default async function ShareEventImagePage() {


    // Потім тут буде відправлятися запит на Event 
    const
        eventTitle = "Let’s make it unforgettable!21321 ⚡️",
        eventDescription = "I just set up an event on Reevel – join me for an unforgettable time!",
        primaryColor = "#AB002F",
        secondaryColor = "#450013";


    return (
        <ShareEvent
            eventTitle={eventTitle}
            eventDescription={eventDescription}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
        />
    );
}