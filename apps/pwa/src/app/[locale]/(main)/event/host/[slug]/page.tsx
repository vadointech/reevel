import { EventDrawerRoot, EventDrawerContent } from "@/components/drawers/event";

import styles from "./styles.module.scss";
import cx from "classnames";

export default function Page() {
    // Я б взагалі робив би це все на 1 пейджі і в залежності від того чи це подія користувача чи публічна чи інвайт,
    // Зробив би 3 вигляду контенту для кожної категорії і передвав би його далі


    return (
        <>
            <EventDrawerRoot>
                <EventDrawerContent
                    variant="host"
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
                        
                </EventDrawerContent>
            </EventDrawerRoot>
        </>
    );
}