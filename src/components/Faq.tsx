import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Jak mogę zgłosić kłusownika?",
    answer:
      "Aby zgłosić kłusownika, wystarczy wypełnić formularz zgłoszeniowy na naszej stronie. Możesz podać szczegóły dotyczące zdarzenia, takie jak lokalizacja, czas i opis sytuacji.",
  },
  {
    question: "Czy moje zgłoszenie będzie anonimowe?",
    answer:
      "Tak, wszystkie zgłoszenia są anonimowe. Dbamy o Twoją prywatność i bezpieczeństwo, dlatego nie będziemy ujawniać Twoich danych osobowych.",
  },
  {
    question: "Co się dzieje po zgłoszeniu kłusownika?",
    answer:
      "Po otrzymaniu zgłoszenia, nasi specjaliści analizują informacje i przekazują je odpowiednim służbom. Współpracujemy z organami ścigania, aby jak najszybciej podjąć odpowiednie działania.",
  },
  {
    question: "Czy mogę śledzić status mojego zgłoszenia?",
    answer:
      "Tak, po złożeniu zgłoszenia otrzymasz unikalny numer referencyjny, który pozwoli Ci śledzić status zgłoszenia na naszej stronie.",
  },
  {
    question: "Jak mogę wesprzeć Waszą działalność?",
    answer:
      "Możesz wesprzeć naszą działalność poprzez darowizny, wolontariat lub udział w naszych akcjach edukacyjnych. Każda forma wsparcia jest dla nas bardzo cenna.",
  },
];

function Faq() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7">
            Często zadawane pytania
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Wszystko, co musisz wiedzieć
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Jeśli masz pytania dotyczące naszej platformy, poniżej znajdziesz
            odpowiedzi na najczęściej zadawane pytania.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Faq;
