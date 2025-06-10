import { GoogleGeocodingApiResponse } from "@/api/google/geocoding/types";

type Input = GoogleGeocodingApiResponse;

class GoogleGeocodingApiResponseTransformer {
    formatAddress(input: Input): Input {
        const output = input.results.filter(
            result =>
                result.types.includes("street_address") ||
              result.types.includes("postal_code") ||
            result.types.includes("route"),
        );

        const postalCode = output.find(result => result.types.includes("postal_code"));

        if(!postalCode) return input;

        let streetAddress = output.find(result => result.types.includes("street_address"));

        if(!streetAddress) {
            streetAddress = output.find(result => result.types.includes("route"));
        }

        if(!streetAddress) return input;


        let displayName = postalCode.formatted_address;
        let formattedAddress = streetAddress.formatted_address;

        if(displayName) {
            const parts = displayName.split(",");
            parts.pop();
            displayName = parts.join(", ");
        }

        if(formattedAddress) {
            const parts = formattedAddress.split(",");
            parts.pop();
            formattedAddress = parts.join(", ");
        }

        return {
            ...input,
            results: [{
                ...postalCode,
                display_name: displayName,
                formatted_address: formattedAddress,
            }],
        };
    }
}

export const googleGeocodingApiResponseTransformer = new GoogleGeocodingApiResponseTransformer();