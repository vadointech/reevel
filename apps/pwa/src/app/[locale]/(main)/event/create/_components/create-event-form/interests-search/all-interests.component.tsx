import { Controller } from "react-hook-form";
import { Checkbox, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { CreateEventFormSchemaValues } from "@/features/event/create";

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
            <Controller
                name={"interests"}
                render={({ field }) => {
                    const exists = (id: number) => {
                        return field.value.includes(id);
                    };
                    const toggle = (id: number) => {
                        field.onChange(
                            exists(id)
                                ? field.value.filter((i: number) => i !== id)
                                : [...field.value, id],
                        );
                    };
                    return (
                        <OptionsList>
                            {
                                Array.from({ length: 8 }).map((_, index) => (
                                    <OptionsListItem
                                        label={"Shopping"}
                                        contentLeft={"🛍️"}
                                        contentRight={<Checkbox checked={exists(index)} />}
                                        onClick={() => toggle(index)}
                                    />
                                ))
                            }
                        </OptionsList>
                    );
                }}

            />
        </Section>
    );
};
