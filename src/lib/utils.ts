import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPlaceFromCoordinates = (
  geocoder: google.maps.Geocoder,
  lat: number,
  lng: number
): Promise<google.maps.GeocoderResult | null> => {
  return new Promise((resolve, reject) => {
    const latLng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results) {
        resolve(results[0]);
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
        resolve(null);
      }
    });
  });
};
