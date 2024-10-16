import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      {/* Hero */}
      <section className="container">
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center pt-24">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Zgłoś Kłusownika: Chroń Naszą Przyrodę
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Pomóż w walce z kłusownictwem! Zgłaszaj nielegalne działania i
              ratuj dzikie zwierzęta dzięki naszej platformie.
            </p>
            {/* Buttons */}
            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Button size={"lg"} asChild>
                <Link href="#zglos">Zgłoś teraz</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#o-projekcie">Dowiedz się więcej</Link>
              </Button>
            </div>
          </div>
          {/* Col */}
          <div className="relative ms-4">
            <Image
              className="w-full rounded-md"
              width={600}
              height={500}
              loading="eager"
              priority={true}
              src="/images/klus1.webp"
              alt="Zdjęcie kłusownika."
            />
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </section>
      {/* End Hero */}
    </>
  );
}
