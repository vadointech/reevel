import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";

export default function Home() {


    return (
        <div>
            <Drawer>
                <DrawerTrigger>
                    Drawer here
                </DrawerTrigger>
                <DrawerBody>
                    <div>
                        tabs
                    </div>
                    <DrawerContent>
                        tests
                    </DrawerContent>
                </DrawerBody>
            </Drawer>
        </div>
    );
}
