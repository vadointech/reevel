import { EventDrawer } from "@/components/drawers/event";

export default function Page() {
    return (
        <>
            <EventDrawer
                poster={"/assets/temp/poster5.png"}
                primaryColor={"#AB002F"}
                title={"Happy Valentine's Day Party"}
                location={"ТЦ SkyPark"}
                date={new Date()}
                price={378}
                currency={"₴"}
                host={{
                    name: "Jimmy Smith",
                    avatar: "/assets/temp/avatar.png",
                }}
                attendees={[
                    {
                        id: "1",
                        avatar: "/assets/temp/avatar.png",
                    },
                    {
                        id: "2",
                        avatar: "/assets/temp/avatar.png",
                    },
                    {
                        id: "3",
                        avatar: "/assets/temp/avatar.png",
                    },
                ]}
                attendeesCount={150}
                description={"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, makingontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making"}
            />
        </>
    );
}