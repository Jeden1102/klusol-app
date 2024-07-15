"use client";

import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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
import { AdvancedMarker, CollisionBehavior } from "@vis.gl/react-google-maps";
import { PlaceAutocomplete } from "./PlaceAutocomplete";

function ReportForm() {
  const [date, setDate] = React.useState<Date>();
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

            <Label className="font-normal" htmlFor="message">
              Miejsce zdarzenia
            </Label>

            <APIProvider
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            >
              <PlaceAutocomplete
                onPlaceSelect={(place) => {
                  console.log(place);
                }}
              />
              <Map
                style={{ height: "40vh" }}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                mapId={"24c5768012c042be"}
              >
                <AdvancedMarker
                  collisionBehavior={
                    CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL
                  }
                  position={{ lat: 29.5, lng: -81.2 }}
                />
              </Map>
            </APIProvider>

            <Button className="w-fit mt-4" size="lg">
              Zgłoś zdarzenie
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReportForm;
