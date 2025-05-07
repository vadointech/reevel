"use client"


import { IconSearch } from "@/components/icons";
import { Header } from "@/components/shared/header";
import { InterestSelect } from "@/components/shared/interest-select";
import { Section, SectionItems } from "@/components/shared/section";
import { Container, Input } from "@/components/ui";

import { InterestEntity } from "@/entities/interests";
import { useInterestSearch } from "@/features/event/hooks/use-interest-search.hook";
import { useEventStore } from "@/features/event";
import { useRouter } from "next/navigation";

import { observer } from "mobx-react-lite";
import { ComponentProps } from "react";

import styles from "./styles.module.scss";
import cx from "classnames"

export namespace InterestsSearch {
    export type Props = ComponentProps<"div"> & {
        initialInterests: InterestEntity[]
    }
}

export const InterestsSearch = observer(({
    initialInterests
}: InterestsSearch.Props) => {
    const eventStore = useEventStore()
    const router = useRouter()

    const { interests, searchValue, handlePickInterest, onSearchValueChange } = useInterestSearch(initialInterests);

    return (
        <Container className={styles.page}>
            <Header
                onControlLeftClick={() => router.back()}
                className={styles.page__header}
            >
                <Input
                    placeholder={"Search"}
                    variant={"rounded"}
                    type="input"
                    icon={<IconSearch />}
                    value={searchValue}
                    onChange={onSearchValueChange}
                />
            </Header>
            <div className={styles.page__wrapper}>
                {
                    searchValue.length <= 0
                        ? <Section title="Selected interests" className={styles.page__selected}>
                            <SectionItems variant={"flex"} className={styles.page__selected__items}>
                                {eventStore.interests.length > 0
                                    ?
                                    eventStore.interests.map((interest) => (
                                        <InterestItem
                                            interest={interest}
                                            key={interest.slug}
                                            selected={true}
                                            handlePickInterest={handlePickInterest}
                                        />
                                    ))

                                    : <div className={styles.page__selected__items_empty}>Add some interests</div>}
                            </SectionItems>
                        </Section>
                        : null
                }

                <Section title="All interests" className={cx(
                    styles.page__interests,
                    searchValue.length > 0 && styles.page__interests_margin
                )}>
                    <SectionItems variant={"flex"} className={styles.page__selected__items}>
                        {
                            interests && interests.length > 0
                                ? interests?.map((interest) => (
                                    eventStore.interests.some((item) => item.slug === interest.slug) ?
                                        false
                                        : <InterestItem
                                            interest={interest}
                                            key={interest.slug}
                                            selected={false}
                                            handlePickInterest={handlePickInterest}
                                        />
                                ))

                                : <div className={styles.page__selected__items_empty}>Nothing was found by {`"${searchValue}"`} or it's already exist</div>
                        }

                    </SectionItems>
                </Section>
            </div>
        </Container>
    )
})

const InterestItem = observer((
    { selected, handlePickInterest, interest }: {
        selected: boolean;
        handlePickInterest: (interest: InterestEntity) => void;
        interest: InterestEntity;
    }
) => {
    return (
        <InterestSelect
            selected={selected}
            key={interest.slug}
            title={interest.title_en}
            icon={interest.icon}
            onClick={() => handlePickInterest(interest)}
        />
    );
});