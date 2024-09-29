import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ReportForm from "@/components/ReportForm";
import { Suspense } from "react";

async function getToken() {
  try {
    const formData = new FormData();
    formData.append('email', process.env.DB_USER || '');
    formData.append('password', process.env.DB_PASSWD || '');

    const res = await fetch(`${process.env.DB_HOST}/login`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.data.token;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getRegions() {
  try {
    const token = await getToken();
    if (!token) throw new Error('Unable to retrieve token');

    const res = await fetch(`${process.env.DB_HOST}/pzw-regions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getPoachingTypes() {
  try {
    const token = await getToken();
    if (!token) throw new Error('Unable to retrieve token');

    const res = await fetch(`${process.env.DB_HOST}/poaching-types`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}


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
