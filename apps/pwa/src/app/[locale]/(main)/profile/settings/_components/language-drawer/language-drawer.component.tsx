import { ComponentProps, useState } from "react"

import { OptionItem, Options } from "@/components/shared/options"
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/_redesign"
import { Container } from "@/components/ui"

import { Back, IconEngland, IconSystemCounty, IconUkraine, IconWorld } from "@/components/icons"
import { Checkbox } from "@/components/shared/checkbox"

import styles from "./styles.module.scss"


export namespace LanguageDrawer {
    export type Props = ComponentProps<"div"> & {
    }
}

type Language = 'english' | 'ukrainian' | 'system';


export const LanguageDrawer = ({ ...props }: LanguageDrawer.Props) => {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>('system');

    const handleLanguageSelect = (language: Language) => {
        setSelectedLanguage(language);
    };

    return (
        <Drawer staticPointKey="Medium">
            <DrawerTrigger className={styles.drawer__trigger} aria-label="Open language settings">
                <OptionItem
                    label="Language"
                    description={selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
                    icon={<IconWorld width={22} height={22} />}
                >
                    <Back width={7} height={14} style={{ rotate: "180deg" }} />
                </OptionItem>
            </DrawerTrigger>
            <DrawerBody>
                <DrawerContent className={styles.drawer}>
                    <h2>Application language</h2>
                    <Container>
                        <Options>
                            <OptionItem
                                label="English"
                                icon={<IconEngland width={22} height={22} />}
                                aria-label="Select English language"
                            >
                                <Checkbox
                                    setSelected={() => handleLanguageSelect('english')}
                                    selected={selectedLanguage === 'english'}
                                />
                            </OptionItem>
                            <OptionItem
                                label="Ukrainian"
                                icon={<IconUkraine width={22} height={22} />}
                                aria-label="Select Ukrainian language"
                            >
                                <Checkbox
                                    setSelected={() => handleLanguageSelect('ukrainian')}
                                    selected={selectedLanguage === 'ukrainian'}
                                />
                            </OptionItem>
                            <OptionItem
                                label="System"
                                icon={<IconSystemCounty width={22} height={22} />}
                                aria-label="Use system language"
                            >
                                <Checkbox
                                    setSelected={() => handleLanguageSelect('system')}
                                    selected={selectedLanguage === 'system'}
                                />
                            </OptionItem>
                        </Options>
                    </Container>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    )
}

