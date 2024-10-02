"use client";

import Lottie from "react-lottie";
import * as animationData from "../../public/lottie/fish.json";

export default function ReportFormSuccess() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex flex-col gap-8 items-center">
      <Lottie options={defaultOptions} height={300} width={350} />
      <p className="text-2xl font-bold text-center">
        Zgloszenie przeslane poprawnie!
      </p>
      <p className="text-center">
        Twoje zgloszenie zostalo przeslane poprawnie. Nastapi weryfikacja danych
        a nastepnie zgloszenie trafi do odpowiednich sluzb. Dziekujemy za troske
        o nasze srodowisko!
      </p>
    </div>
  );
}
