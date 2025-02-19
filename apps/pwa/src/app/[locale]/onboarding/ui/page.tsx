'use client'
import { Container } from "@/components/ui";
import { PillButton } from "@/components/ui/pill-button/pill-button.component";
import { useState } from "react";


export default function Page() {
    const [isSelected, setIsSelected] = useState(false);

    const handleChange = (selected: boolean) => {
        setIsSelected(selected);
        // You can add additional logic here if needed
        console.log('Button selected:', selected);
    };

    return (
        <Container>
            <PillButton
                name={'Art'}
                variant="primary"
                icon={'🎧'}
                selected={isSelected}
                onChange={handleChange}
            />
        </Container>
    );
}