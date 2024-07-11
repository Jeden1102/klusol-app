import {
  BookOpenIcon,
  ChevronRightIcon,
  MessagesSquareIcon,
  ThumbsUpIcon,
} from "lucide-react";

export default function Features() {
  return (
    <>
      {/* Icon Blocks */}
      <section className="container py-24 lg:py-32">
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="lg:w-3/4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Narzędzia wspomagające ochronę przyrody
            </h2>
            <p className="mt-3 text-muted-foreground">
              Pomagamy społecznościom w walce z kłusownictwem, dostarczając
              narzędzia technologiczne do zgłaszania i monitorowania
              nielegalnych działań.
            </p>
            <p className="mt-5">
              <a
                className="inline-flex items-center gap-x-1 group font-medium hover:underline underline-offset-4 "
                href="#"
              >
                Skontaktuj się z nami, aby dowiedzieć się więcej
                <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" />
              </a>
            </p>
          </div>
          {/* End Col */}
          <div className="space-y-6 lg:space-y-10">
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                <BookOpenIcon className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">
                  Przodująca dokumentacja
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Nasza dokumentacja i obszerne zasoby zawierają wszystko, czego
                  potrzebujesz, aby szybko i skutecznie zgłaszać przypadki
                  kłusownictwa.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border  bg-primary text-primary-foreground">
                <MessagesSquareIcon className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">
                  Wsparcie społeczności
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Aktywnie współpracujemy ze społecznościami i organizacjami
                  zajmującymi się ochroną przyrody, wspierając ich działania
                  poprzez rozwój technologii i sponsorowanie projektów.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                <ThumbsUpIcon className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">
                  Proste i dostępne
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Nasza platforma jest intuicyjna i łatwa w obsłudze, dzięki
                  czemu każdy może zgłaszać przypadki kłusownictwa i pomagać w
                  ochronie przyrody.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </section>
      {/* End Icon Blocks */}
    </>
  );
}
