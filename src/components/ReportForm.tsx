"use client";

import React, { FormEvent } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Info } from "lucide-react";
import z from "zod";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReportFormFeatures from "./ReportFormFeatures";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { PlaceAutocomplete } from "./PlaceAutocomplete";
import { useState, useEffect } from "react";

function ReportForm() {
  const [date, setDate] = React.useState<Date>();
  const [mapCenter, setMapCenter] = useState({ lat: 22.54992, lng: 0 });
  const [marker, setMarker] = useState({ lat: -999, lng: -999 });
  const [mapZoom, setMapZoom] = useState(3);

  const validationSchema = z.object({
    reportDate: z.string().min(1),
    reportType: z.string().min(1),
    reportDescription: z.string().min(1),
    reportPlace: z.string().min(1),
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

  const handleFormSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    console.log(ev), "here - przygotowanie forma";
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
          <div className="lg:w-1/2 flex flex-col gap-3">
            <h2 className="font-semibold text-lg md:text-xl">
              Zglos zdarzenie
            </h2>
            <form onSubmit={(ev) => handleFormSubmit(ev)}>
              <div className="flex flex-col gap-3">
                <Label className="font-normal" htmlFor="message">
                  Data zdarzenia
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
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
              </div>
              <div className="flex flex-col gap-3">
                <Label className="font-normal" htmlFor="message">
                  Typ klusownictwa
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz typ klusownictwa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net">Sieci w wodzie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3">
                <Label className="font-normal" htmlFor="message">
                  Opis sytuacji
                </Label>
                <Textarea
                  placeholder="Dwóch mężczyzn używało sieci.."
                  id="message"
                />
              </div>

              <Label
                className="font-normal flex items-center gap-2"
                htmlFor="message"
              >
                Miejsce zdarzenia
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info strokeWidth={1.5} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-72">
                        Wpisz miejsce zdarzenia (np. 'Gdynia'), wybierz miejsce
                        z listy, a nastepnie przemiesc marker w odpowiednia
                        pozycje.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>

              <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
              >
                <PlaceAutocomplete
                  onPlaceSelect={(place) => handlePlaceSelect(place)}
                />
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
