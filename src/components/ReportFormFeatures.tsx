const steps = [
  {
    number: 1,
    title: "Tworzysz zgłoszenie",
    description:
      "Pierwszym krokiem jest stworzenie zgłoszenia. Wypełnij formularz, podając wszystkie niezbędne informacje.",
  },
  {
    number: 2,
    title: "Weryfikujemy zgłoszenie",
    description:
      "Nasza ekipa dokładnie sprawdza wszystkie zgłoszone informacje, aby upewnić się, że są one kompletne i prawdziwe.",
  },
  {
    number: 3,
    title: "Przekazujemy zgłoszenie do odpowiednich służb",
    description:
      "Po weryfikacji, przekazujemy Twoje zgłoszenie do odpowiednich służb, które zajmą się sprawą.",
  },
  {
    number: 4,
    title: "Służby podejmują działania",
    description:
      "Odpowiednie służby podejmują niezbędne działania, aby rozwiązać zgłoszony problem.",
  },
];

function ReportFormFeatures() {
  return (
    <div>
      <p className="mt-5 inline-flex items-center gap-x-1 group font-medium underline-offset-4">
        Jak wygląda proces zgłoszenia?
      </p>
      {steps.map((step) => (
        <div className="flex my-6" key={step.number}>
          <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
            {step.number}
          </span>
          <div className="ms-5 sm:ms-8">
            <h3 className="text-base font-semibold">{step.title}</h3>
            <p className="mt-1 text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReportFormFeatures;
