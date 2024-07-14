import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Hero() {
    return (
        <>
            {/* Hero */}
            <section className="container">
                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
                    <div>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Zgłoś Kłusownika: Chroń Naszą Przyrodę
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground">
                            Pomóż w walce z kłusownictwem! Zgłaszaj nielegalne
                            działania i ratuj dzikie zwierzęta dzięki naszej
                            platformie.
                        </p>
                        {/* Buttons */}
                        <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                            <Button size={"lg"}>Zgłoś teraz</Button>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                            >
                                <Link href="#o-projekcie">Dowiedz się więcej</Link>
                            </Button>
                        </div>
                    </div>
                    {/* Col */}
                    <div className="relative ms-4">
                        <img
                            className="w-full rounded-md"
                            src="/images/klus1.jpg"
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
