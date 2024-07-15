import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ReportForm from "@/components/ReportForm";
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-1 sm:p-4 md:p-12">
      <Hero />
      <Features />
      <Faq />
      <ReportForm />
    </main>
  );
}
