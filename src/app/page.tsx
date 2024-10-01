import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ReportForm from "@/components/ReportForm";
import { Suspense } from "react";
import { getRegions, getPoachingTypes } from "./actions";

export default async function Home() {
  const [regions, poachingTypes] = await Promise.all([
    getRegions(),
    getPoachingTypes(),
  ]);

  return (
    <main className="flex flex-col min-h-screen p-1 sm:p-4 md:p-12">
      <Hero />
      <Features />
      <Faq />
      <Suspense fallback={<div>Wczytywanie formularza...</div>}>
        <ReportForm regions={regions} poachingTypes={poachingTypes} />
      </Suspense>
    </main>
  );
}
