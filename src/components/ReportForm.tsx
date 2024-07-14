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

function ReportForm() {
    const [date, setDate] = React.useState<Date>();
    return (
        <>
            <section className="container py-24" id="zglos">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                            Zgłoszenie kłusownika
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            Widziałeś podejarzene zachowanie? Podejrzewasz, że
                            widziałeś kłusownika? Być może zachowania jakichś
                            nad wodą wzbudziły Twoje podejrzenia?
                        </p>
                        <p className="mt-5 inline-flex items-center gap-x-1 group font-medium underline-offset-4 ">
                            Użyj formularza zgłaszania kłusownika!
                        </p>
                    </div>
                    <div className="lg:w-1/2 flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="message">Data zdarzenia</Label>
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
                                        {date ? (
                                            format(date, "PPP")
                                        ) : (
                                            <span>Wybierz datę</span>
                                        )}
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
                            <Label htmlFor="message">Opis sytuacji</Label>
                            <Textarea
                                placeholder="Dwóch mężczyzn używało sieci.."
                                id="message"
                            />
                        </div>

                        <Label htmlFor="message">Miejsce zdarzenia</Label>
                        <APIProvider
                            apiKey={
                                process.env
                                    .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
                            }
                        >
                            <Map
                                style={{ height: "40vh" }}
                                defaultCenter={{ lat: 22.54992, lng: 0 }}
                                defaultZoom={3}
                                gestureHandling={"greedy"}
                                disableDefaultUI={true}
                            />
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
