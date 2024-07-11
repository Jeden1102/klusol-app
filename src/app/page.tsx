import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
Features;
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-24">
      <Hero />
      <Features />
      <Faq />
    </main>
  );
}
