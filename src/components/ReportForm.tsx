"use client";

import React, { FormEvent } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Info } from "lucide-react";
import z from "zod";
import { getPlaceFromCoordinates } from "@/lib/utils";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ReportFormFeatures from "./ReportFormFeatures";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { PlaceAutocomplete } from "./PlaceAutocomplete";
import { useState, useEffect } from "react";

function ReportForm() {
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const places = useMapsLibrary("places");
  const [validationErrors, setValidationErrors] = useState({} as any);
  const [date, setDate] = React.useState<Date>();
  const [reportType, setReportType] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 22.54992, lng: 0 });
  const [marker, setMarker] = useState({ lat: -999, lng: -999 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    if (marker.lat !== -999) {
      setGeocoder(new google.maps.Geocoder());
    }
  }, [marker]);

  const handleLatLngToPlace = async ({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }) => {
    if (!geocoder) return;

    return await getPlaceFromCoordinates(geocoder, lat, lng);
  };

  const validationSchema = z.object({
    reportDate: z.date({ message: "Pole wymagane" }),
    reportType: z.string().min(1, { message: "Pole wymagane" }),
    reportDescription: z
      .string()
      .min(1, { message: "Pole wymagane" })
      .max(1024),
    reportPlace: z.object({
      formatted_address: z
        .string()
        .min(1, { message: "Wybierz adres z listy" }),
    }),
  });

  const handlePlaceSelect = (place: any) => {
    const position = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    setMarker(position);
    setMapCenter(position);
    setMapZoom(13);
  };

  const handleFormSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const values = {
      reportDate: date,
      reportType: reportType,
      reportDescription: reportDescription,
      reportPlace: { formatted_address: "", coordinates: {} },
    };

    const place = await handleLatLngToPlace(marker);
    if (place) {
      values.reportPlace.formatted_address = place?.formatted_address;
      values.reportPlace.coordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
    }

    const validate = validationSchema.safeParse(values);

    if (!validate.success) {
      setValidationErrors(validate.error.flatten().fieldErrors);
      return;
    }

    console.log(values);
  };
  return (
    <>
      <section className="container py-24" id="zglos">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="lg:w-1/2">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Zgłoszenie kłusownika
            </h2>
            <p className="mt-3 text-muted-foreground">
              Widziałeś podejarzene zachowanie? Podejrzewasz, że widziałeś
              kłusownika? Być może zachowania jakichś nad wodą wzbudziły Twoje
              podejrzenia?
            </p>
            <ReportFormFeatures />
          </div>
          <div className="lg:w-1/2 flex flex-col">
            <h2 className="font-semibold text-lg md:text-xl">
              Zglos zdarzenie
            </h2>
            <form onSubmit={(ev) => handleFormSubmit(ev)}>
              <div className="flex flex-col">
                <Label className="font-normal my-2" htmlFor="message">
                  Data zdarzenia
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        validationErrors.reportDate ? "error-field" : ""
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Wybierz datę</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {validationErrors.reportDate && (
                  <span className="error">
                    {validationErrors.reportDate[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <Label className="font-normal my-2" htmlFor="message">
                  Typ klusownictwa
                </Label>
                <Select onValueChange={(val) => setReportType(val)}>
                  <SelectTrigger
                    className={validationErrors.reportType ? "error-field" : ""}
                  >
                    <SelectValue placeholder="Wybierz typ klusownictwa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net">Sieci w wodzie</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.reportType && (
                  <span className="error">
                    {validationErrors.reportType[0]}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <Label className="font-normal my-2" htmlFor="message">
                  Opis sytuacji
                </Label>
                <Textarea
                  placeholder="Dwóch mężczyzn używało sieci.."
                  id="message"
                  onKeyUp={(ev: React.KeyboardEvent<HTMLTextAreaElement>) =>
                    setReportDescription(ev.currentTarget.value)
                  }
                  className={
                    validationErrors.reportDescription ? "error-field" : ""
                  }
                />
                {validationErrors.reportDescription && (
                  <span className="error">
                    {validationErrors.reportDescription[0]}
                  </span>
                )}
              </div>

              <div className="flex flex-col mt-2">
                <Label
                  className="font-normal flex gap-1 flex-col"
                  htmlFor="message"
                >
                  Miejsce zdarzenia
                  <span className="font-light text-[12px]">
                    Wpisz miejsce zdarzenia (np. Gdynia), wybierz miejsce z
                    listy, a nastepnie przemiesc marker w odpowiednia pozycje.
                  </span>
                </Label>
              </div>

              <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
              >
                <div className="my-2">
                  <PlaceAutocomplete
                    onPlaceSelect={(place) => handlePlaceSelect(place)}
                  />
                  {validationErrors.reportPlace && (
                    <span className="error">
                      {validationErrors.reportPlace[0]}
                    </span>
                  )}
                </div>
                <Map
                  style={{ height: "40vh" }}
                  defaultCenter={mapCenter}
                  defaultZoom={3}
                  center={mapCenter}
                  zoom={mapZoom}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                  mapId={"24c5768012c042be"}
                  onBoundsChanged={(ev) => {
                    setMapCenter(ev.detail.center);
                  }}
                  onZoomChanged={(ev) => setMapZoom(ev.detail.zoom)}
                >
                  {marker.lat && (
                    <AdvancedMarker
                      position={marker}
                      draggable={true}
                      onDragEnd={(ev) => {
                        console.log(ev);
                      }}
                    />
                  )}
                </Map>
              </APIProvider>

              <Button className="w-fit mt-4" size="lg">
                Zgłoś zdarzenie
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReportForm;
