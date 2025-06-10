import { EventDrawerRoot, EventDrawerContent } from "@/components/drawers/event";

import styles from "./styles.module.scss";
// import cx from "classnames";
import { Avatar, Button, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { Container } from "@/components/ui";

export default function Page() {
    // Я би це все робив на 1 пейджі в 1 компоненті, зробив би перевірки що це за подія (моя, запрошений, хост) і в залежності від цього
    // вибирав який контент показувати. Виніс би його в окрему папку де було б 3 варіанти (host,invited,public)

    return (
        <>
            <EventDrawerRoot>
                <EventDrawerContent
                    variant="private"
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
                        { id: "1", userId: "1", completed: "true", picture: "http://localhost:3000/assets/temp/valentine.png" },
                        { id: "2", userId: "2", completed: "true", picture: "http://localhost:3000/assets/temp/poster1.jpg" },
                        { id: "3", userId: "3", completed: "true", picture: "http://localhost:3000/assets/temp/poster2.png" },
                        { id: "4", userId: "4", completed: "true", picture: "http://localhost:3000/assets/temp/poster3.png" },
                        { id: "5", userId: "5", completed: "true", picture: "http://localhost:3000/assets/temp/poster4.png" },
                    ]}
                    attendeesCount={150}
                    description={"Contrary to popular belief, Lorem Ipsum is not simply random text-area. It has roots in a piece of classical Latin literature from 45 BC, makingontrary to popular belief, Lorem Ipsum is not simply random text-area. It has roots in a piece of classical Latin literature from 45 BC, making"}
                >
                    <Container className={styles.gap}>
                        <Section title="Guests List" description="4 attendees">
                            <OptionsList>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <OptionsListItem
                                        key={index}
                                        label={"Julia Smith"}
                                        status={"👍"}
                                        description={"accepted the invitation"}
                                        relativeTime="1h"
                                        variant={"avatar"}
                                        contentLeft={
                                            <Avatar
                                                key={1}
                                                image={"http://localhost:3000/assets/temp/avatar.png"}
                                                variant={"bordered"}
                                            />
                                        }
                                        href={"/event/create/location"}
                                        contentRight={false}
                                    />
                                ))}
                                <OptionsListItem
                                    label={"Julia Smith"}
                                    status={"✏️"}
                                    description={"Would you mind changing the time from 18:00 to 18:30?"}
                                    relativeTime="1h"
                                    variant={"avatar"}
                                    contentLeft={
                                        <Avatar
                                            key={1}
                                            image={"http://localhost:3000/assets/temp/avatar.png"}
                                            variant={"bordered"}
                                        />
                                    }
                                    contentBottom={
                                        <div className={styles.buttons}>
                                            <Button variant="accent" size="xsmall">
                                                Accept
                                            </Button>
                                            <Button variant="accent-muted" size="xsmall">
                                                Decline
                                            </Button>
                                        </div>
                                    }
                                    href={"/event/create/location"}
                                    contentRight={false}
                                />
                            </OptionsList>
                        </Section>
                    </Container>
                </EventDrawerContent>
            </EventDrawerRoot>
        </>
    );
}