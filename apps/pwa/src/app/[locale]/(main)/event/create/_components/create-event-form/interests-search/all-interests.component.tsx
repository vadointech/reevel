import { Controller } from "react-hook-form";
import { Checkbox, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";

import { CreateEventFormSchemaValues } from "../create-event-form.schema";

export namespace SearchInterestsAll {
    export type Props = {
        interests: CreateEventFormSchemaValues["interests"] | undefined;
    };
}

export const SearchInterestsAll = ({ ...props }: SearchInterestsAll.Props) => {
    return (
        <Section
            title={"All interests"}
        >
            <OptionsList>
                {
                    Array.from({ length: 8 }).map((_, index) => (
                        <Controller
                            name={"interests"}
                            render={({ field }) => {
                                const isExists = field.value.includes(index);
                                const handleClick = () => {
                                    if(isExists) {
                                        field.onChange(
                                            field.value.filter((item: number) => item !== index),
                                        );
                                    } else {
                                        field.onChange([...field.value, index]);
                                    }
                                };
                                return (
                                    <OptionsListItem
                                        label={"Shopping"}
                                        contentLeft={"🛍️"}
                                        contentRight={<Checkbox checked={isExists} />}
                                        onClick={handleClick}
                                    />
                                );
                            }}
                        />
                    ))
                }
            </OptionsList>
        </Section>
    );
};
