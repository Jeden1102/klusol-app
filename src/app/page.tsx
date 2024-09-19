import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ReportForm from "@/components/ReportForm";
import { Suspense } from "react";
import { createReport } from "./actions";

async function getRegions() {
  try {
    const res = await fetch(`${process.env.DB_HOST}`);
    return await res.json();
  } catch (err) {
    return false;
  }
}

async function getPoachingTypes() {
  try {
    const res = await fetch(`${process.env.DB_HOST}`);
    return await res.json();
  } catch (err) {
    return false;
  }
}

export default async function Home() {
  const [regions, poachingTypes] = await Promise.all([
    getRegions(),
    getPoachingTypes(),
  ]);

  console.log(regions);
  console.log(poachingTypes);
  return (
    <main className="flex flex-col min-h-screen p-1 sm:p-4 md:p-12">
      <Hero />
      <Features />
      <Faq />
      <Suspense fallback={<div>Wczytywanie formularza...</div>}>
        <ReportForm
          regions={regions}
          poachingTypes={poachingTypes}
          createReport={createReport}
        />
      </Suspense>
    </main>
  );
}
