"use client";

import React, { FormEvent } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { CgSpinnerAlt } from "react-icons/cg";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Info } from "lucide-react";
import z from "zod";
import { getPlaceFromCoordinates } from "@/lib/utils";
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
import { Switch } from "@/components/ui/switch";
import ReportFormFeatures from "./ReportFormFeatures";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { PlaceAutocomplete } from "./PlaceAutocomplete";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { createReport } from "@/app/actions";
import SubmitButton from "./SubmitButton";
interface ResponseObject {
  id: number;
  label: string;
}

interface Props {
  regions: ResponseObject[] | Boolean;
  poachingTypes: ResponseObject[] | Boolean;
}
function ReportForm({ regions, poachingTypes }: Props) {
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [validationErrors, setValidationErrors] = useState({} as any);
  const [reportDate, setReportDate] = useState<Date>();
  const [reportType, setReportType] = useState("");
  const [reportAddress, setReportAddress] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 52, lng: 20 });
  const [marker, setMarker] = useState({ lat: -999, lng: -999 });
  const [mapZoom, setMapZoom] = useState(5);
  const [isReportOther, setIsReportOther] = useState(false);
  const [otherTypeValue, setOtherTypeValue] = useState("");
  const [reportRegion, setReportRegion] = useState("");
  const [reportImage, setReportImage] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);

  const MAX_FILE_SIZE = 5000000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

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
    reportRegion: z.string().min(1, { message: "Pole wymagane" }),
    reportImage: z
      .any()
      .refine(() => reportImage instanceof File, {
        message: "Zdjecie wymagane.",
      })
      .refine(
        () =>
          reportImage instanceof File &&
          ACCEPTED_IMAGE_TYPES.includes(reportImage.type),
        {
          message:
            "Pliki w formacie .jpg, .jpeg, .png and .webp sa akceptowane.",
        }
      )
      .refine(
        () => reportImage instanceof File && reportImage.size <= MAX_FILE_SIZE,
        {
          message: `Max. rozmiar pliku wynosi 5MB.`,
        }
      ),
    reportDescription: z
      .string()
      .min(1, { message: "Pole wymagane" })
      .max(1024),
    marker: z.object({
      lat: z.number().gt(-999, { message: "Wybierz miejsce z listy" }),
      lng: z.number().gt(-999, { message: "Wybierz miejsce z listy" }),
    }),
    otherTypeValue: z
      .string()
      .max(1024)
      .optional()
      .refine(
        () => {
          if (isReportOther) {
            return otherTypeValue.length > 0;
          }
          return true;
        },
        {
          message: "Pole wymagane",
          path: ["otherTypeValue"],
        }
      ),
  });

  const handlePlaceSelect = async (place: any) => {
    const position = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    setReportAddress(place?.formatted_address);

    setMarker(position);
    setMapCenter(position);
    setMapZoom(13);
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsPending(true);
    const values = {
      reportDate,
      reportType,
      reportRegion,
      otherTypeValue,
      reportImage,
      marker,
      reportDescription: reportDescription,
      reportPlace: { formatted_address: "", coordinates: {} },
    };

    let validate = null;

    if (!isReportOther) {
      validate = validationSchema
        .extend({
          reportType: z.string().min(1, { message: "Pole wymagane" }),
        })
        .safeParse(values);
    } else {
      validate = validationSchema.safeParse(values);
    }

    if (!validate.success) {
      setValidationErrors(validate.error.flatten().fieldErrors);
      setIsPending(false);
      return;
    }

    const place = await handleLatLngToPlace(marker);
    if (place) {
      values.reportPlace.formatted_address = place?.formatted_address;
      setReportAddress(place?.formatted_address);
      console.log(place, place.formatted_address);
      values.reportPlace.coordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
    }

    setValidationErrors({});
    const res = await createReport(formData);
    console.log(res);
    setIsPending(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setReportImage(event.target.files[0]);
    }
  };

  return (
    <>
      <section className="container py-24" id="zglos">
        <div className="flex flex-col lg:flex-row gap-12">
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
              Zgłoś zdarzenie
            </h2>
            {regions && poachingTypes && (
              <form action={handleFormSubmit}>
                <div className="flex flex-col">
                  <Label className="font-normal my-4" htmlFor="date">
                    Data zdarzenia
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal date-input",
                          !reportDate && "text-muted-foreground",
                          validationErrors.reportreportDate ? "error-field" : ""
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {reportDate ? (
                          format(reportDate, "PPP")
                        ) : (
                          <span>Wybierz datę</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={reportDate}
                        onSelect={setReportDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {reportDate && (
                    <input
                      type="hidden"
                      name="reportDate"
                      value={Date.parse(reportDate.toLocaleDateString())}
                    />
                  )}

                  {validationErrors.reportDate && (
                    <span className="error">
                      {validationErrors.reportDate[0]}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <Label className="font-normal my-4" htmlFor="type">
                    Typ klusownictwa
                  </Label>
                  <Select
                    name="poachingType"
                    onValueChange={(val) => setReportType(val)}
                  >
                    <SelectTrigger
                      className={
                        validationErrors.reportType ? "error-field" : ""
                      }
                      title="Typ klusownictwa"
                    >
                      <SelectValue placeholder="Wybierz typ klusownictwa" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(poachingTypes) &&
                        poachingTypes.map((poachingType) => (
                          <SelectItem
                            key={poachingType.id}
                            value={poachingType.id.toString()}
                          >
                            {poachingType.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2 my-4">
                    <Switch
                      id="report-other"
                      checked={isReportOther}
                      onCheckedChange={setIsReportOther}
                    />
                    <Label htmlFor="report-other">Inny typ klusownictwa</Label>
                  </div>
                  {isReportOther && (
                    <Input
                      placeholder="Wpisz typ klusownictwa"
                      onChange={(ev) => setOtherTypeValue(ev.target.value)}
                    />
                  )}

                  {validationErrors.reportType && (
                    <span className="error">
                      {validationErrors.reportType[0]}
                    </span>
                  )}
                  {validationErrors.otherTypeValue && (
                    <span className="error">
                      {validationErrors.otherTypeValue[0]}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <Label className="font-normal my-4" htmlFor="message">
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
                    name="reportDescription"
                  />
                  {validationErrors.reportDescription && (
                    <span className="error">
                      {validationErrors.reportDescription[0]}
                    </span>
                  )}
                </div>
                <div className="flex flex-col my-4">
                  <Label className="font-normal mb-4" htmlFor="file">
                    Dodaj zdjęcie (opcjonalnie)
                  </Label>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      name="reportImage"
                      onChange={handleFileChange}
                      className={
                        validationErrors.reportImage ? "error-field" : ""
                      }
                    />
                    {reportImage && (
                      <img
                        src={URL.createObjectURL(reportImage)}
                        alt="Wybrane zdjęcie"
                        className="w-32 h-32 object-cover rounded-md border"
                      />
                    )}
                  </div>
                  {validationErrors?.reportImage && (
                    <p className="error">{validationErrors.reportImage}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <Label className="font-normal my-4" htmlFor="type">
                    Okreg PZW
                  </Label>
                  <Select
                    name="reportRegion"
                    onValueChange={(val) => setReportRegion(val)}
                  >
                    <SelectTrigger
                      className={
                        validationErrors.reportRegion ? "error-field" : ""
                      }
                      title="Okreg PZW"
                    >
                      <SelectValue placeholder="Wybierz okreg PZW" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(regions) &&
                        regions.map((region) => (
                          <SelectItem
                            key={region.id}
                            value={region.id.toString()}
                          >
                            {region.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {validationErrors.reportRegion && (
                    <span className="error">
                      {validationErrors.reportRegion[0]}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <Label
                    className="font-normal flex gap-1 flex-col"
                    htmlFor="place"
                  >
                    Miejsce zdarzenia
                    <span className="font-light text-[12px]">
                      Wpisz miejsce zdarzenia (np. Gdynia), wybierz miejsce z
                      listy, a nastepnie przemiesc marker w odpowiednia pozycje.
                    </span>
                  </Label>
                </div>

                <input
                  type="hidden"
                  name="reportPlace[formatted]"
                  value={reportAddress}
                />

                <input
                  type="hidden"
                  name="reportPlace[lat]"
                  value={marker.lat.toString()}
                />

                <input
                  type="hidden"
                  name="reportPlace[lng]"
                  value={marker.lng.toString()}
                />

                <APIProvider
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
                >
                  <div className="my-2">
                    <PlaceAutocomplete
                      onPlaceSelect={(place) => handlePlaceSelect(place)}
                    />
                    {validationErrors.marker && (
                      <span className="error">
                        {validationErrors.marker[0]}
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
                          setMarker({
                            lat: ev.latLng?.lat() as number,
                            lng: ev.latLng?.lng() as number,
                          });
                        }}
                      />
                    )}
                  </Map>
                </APIProvider>

                <SubmitButton />
              </form>
            )}
            {!regions && !poachingTypes && (
              <p>Formularz zgloszeniowy obecnie niedostepny.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ReportForm;
