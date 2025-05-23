import { LngLat } from "mapbox-gl";
import { GooglePlacesApiResponse } from "@/api/google/places/types";
import { MapProviderGL } from "@/components/shared/map/providers/mapbox/types";

class GooglePlacesApiResponseTransformer<T extends GooglePlacesApiResponse = GooglePlacesApiResponse> {
    /**
     * Filters an array of points, removing points that are too close to each other.
     *
     * @param input An array of objects, each containing a `location` property of type `MapProviderGL.LngLat`.
     *               Additional properties can be included in the objects.
     * @param minDistanceInMeters The minimum distance, in meters, that must exist between points to include both. Defaults to 5 meters.
     * @return An array of points where no two points are closer than the specified minimum distance.
     */
    filterClosePoints(
        input: GooglePlacesApiResponse,
        minDistanceInMeters: number = 5, // Default minimum distance between points (50 meters)
    ): GooglePlacesApiResponse {
      type Point = { location: MapProviderGL.LngLat, place: T["places"][number] };

      if (!input || input.places.length === 0) return input;

      const filteredPoints: Point[] = [];

      const points: Point[] = input.places.map(item => ({
          place: item,
          location: new LngLat(item.location.longitude, item.location.latitude),
      }));

      // Always include the first point
      if (points.length > 0) {
          filteredPoints.push(points[0]);
      }

      // Check each subsequent point against all filtered points
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
          places: filteredPoints.map(item => ({
              ...item.place,
              location: {
                  longitude: item.location.lng,
                  latitude: item.location.lat,
              },
          })),
      };
    }

    filterEmptyImages(input: GooglePlacesApiResponse): GooglePlacesApiResponse {
        return {
            places: input.places.filter(place => place.photos && place.photos.length > 0),
        };
    }

    filterEmptyIcons(input: GooglePlacesApiResponse): GooglePlacesApiResponse {
        return {
            places: input.places.filter(place => place.iconMaskBaseUri && place.iconBackgroundColor),
        };
    }
}

export const googlePlacesApiResponseTransformer = new GooglePlacesApiResponseTransformer();