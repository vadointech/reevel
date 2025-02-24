'use client'
import { Container } from "@/components/ui";
import { PillButton } from "@/components/ui/pill-button/pill-button.component";
import { useState } from "react";


export default function Page() {
    const [selectedButtons, setSelectedButtons] = useState<Record<string, boolean>>({});
    const handleChange = (name: string) => (selected: boolean) => {
        setSelectedButtons(prev => ({
            ...prev,
            [name]: selected
        }));
    };

    return (
        <Container style={{ marginTop: '100px' }}>
            <PillButton
                name={'Art'}
                variant="default"
                icon={'🛍️'}
                selected={selectedButtons["Art"]}
                onChange={handleChange("Art")}
            />
        </Container>
    );
}