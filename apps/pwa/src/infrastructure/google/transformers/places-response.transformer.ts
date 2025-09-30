import { LngLat } from "mapbox-gl";
import { GooglePlacesApiResponse } from "@/api/google/places/types";
import { MapProviderGL } from "@/components/shared/map/providers/mapbox/types";

type Input = GooglePlacesApiResponse;

class GooglePlacesApiResponseTransformer {
    /**
     * Filters an array of points, removing points that are too close to each other.
     *
     * @param input An array of objects, each containing a `location-badge` property of type `MapProviderGL.LngLat`.
     *               Additional properties can be included in the objects.
     * @param minDistanceInMeters The minimum distance, in meters, that must exist between points to include both. Defaults to 50 meters.
     * @return An array of points where no two points are closer than the specified minimum distance.
     */
    filterClosePoints(
        input: Input,
        minDistanceInMeters: number = 5, // Default minimum distance between points (50 meters)
    ): Input {
      type Point = { location: MapProviderGL.LngLat, place: Input["places"][number] };

      if (!input || input.places.length === 0) return input;

      const filteredPoints: Point[] = [];

      const points: Point[] = [];

      input.places.forEach(item => {
          if(item.location) {
              points.push({
                  place: item,
                  location: new LngLat(item.location.longitude, item.location.latitude),
              });
          }
      });

      // Always include the first point
      if (points.length > 0) {
          filteredPoints.push(points[0]);
      }

      // Check each following point against all filtered points
      for (let i = 1; i < points.length; i++) {
          const currentPoint = points[i];
          let isTooClose = false;

          // Check if this point is too close to any already-filtered point
          for (let j = 0; j < filteredPoints.length; j++) {
              const distance = currentPoint.location.distanceTo(filteredPoints[j].location);

              if (distance < minDistanceInMeters) {
                  isTooClose = true;
                  break;
              }
          }

          // If the point is not too close to any existing point, add it
          if (!isTooClose) {
              filteredPoints.push(currentPoint);
          }
      }

      return {
          ...input,
          places: filteredPoints.map(item => ({
              ...item.place,
              location: {
                  longitude: item.location.lng,
                  latitude: item.location.lat,
              },
          })),
      };
    }


    smartAddressFormat(input: Input): Input {
        return {
            places: input.places.map(place => {
                const components = place.addressComponents || [];

                let city, country, district;
                let hasAdminArea2 = false;

                for (const item of components) {
                    if (item.types.includes("locality")) city = item;
                    if (item.types.includes("country")) country = item;
                    if (item.types.includes("administrative_area_level_1")) district = item;
                    if (item.types.includes("administrative_area_level_2")) hasAdminArea2 = true;
                }

                const formattedAddress = hasAdminArea2
                    ? `${city?.longText}, ${district?.longText}, ${country?.longText}`
                    : `${city?.longText}, ${country?.longText}`;

                return {
                    ...place,
                    formattedAddress,
                };
            }),
        };
    }

    formatAddress(input: Input): Input {
        return {
            ...input,
            places: input.places.map(place => {
                let formattedAddress = place.formattedAddress;

                if(formattedAddress) {
                    const parts = formattedAddress.split(",");
                    parts.pop();
                    formattedAddress = parts.join(", ");
                }

                return {
                    ...place,
                    formattedAddress,
                };
            }),
        };
    }
}

export const googlePlacesApiResponseTransformer = new GooglePlacesApiResponseTransformer();