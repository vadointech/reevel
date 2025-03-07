import { ComponentProps } from "react";
import { OnboardingLocationItem } from "../location-item";

export namespace OnboardingLocationPicker {
    export type Props = ComponentProps<"div">;
}

const locations = [
    { city: "Vinn", country: "Vinnitsa, Ukraine" },
    { city: "Palo Alto", country: "8502 Preston Rd. Ingl..." },
    { city: "Bershad’", country: "Vinnitsa, Ukraine" },
    { city: "Vinn", country: "Vinnitsa, Ukraine" },
    { city: "Palo Alto", country: "8502 Preston Rd. Ingl..." },
    { city: "Bershad’", country: "Vinnitsa, Ukraine" },
    { city: "Vinn", country: "Vinnitsa, Ukraine" },
    { city: "Palo Alto", country: "8502 Preston Rd. Ingl..." },
    { city: "Bershad’", country: "Vinnitsa, Ukraine" },
    { city: "Vinn", country: "Vinnitsa, Ukraine" },
    { city: "Palo Alto", country: "8502 Preston Rd. Ingl..." },
    { city: "Bershad’", country: "Vinnitsa, Ukraine" },
    { city: "Bershad’", country: "Vinnitsa, Ukraine" },
    { city: "Vinn", country: "Vinnitsa, Ukraine" },
    { city: "Palo Alto", country: "8502 Preston Rd. Ingl..." },
    { city: "Bershad’", country: "Vinnitsa, Ukraine" },
];

export const OnboardingLocationPicker = ({}: OnboardingLocationPicker.Props) => {
    return (
        <>
            {
                locations.map((item, i) => (
                    <OnboardingLocationItem key={i} data={item} />
                ))
            }
        </>
    );
};
