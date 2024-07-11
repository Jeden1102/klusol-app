import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-1 sm:p-4 md:p-24">
      <Hero />
      <Features />
      <Faq />
    </main>
  );
}
