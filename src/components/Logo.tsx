import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TbFishOff } from "react-icons/tb";

function Logo() {
  return (
    <Button variant="ghost" asChild>
      <Link href="#start" className="text-xl font-semibold">
        Zgłoś
        <span className="font-bold text-primary">Kłusownika</span>
        <TbFishOff className="text-3xl" />
      </Link>
    </Button>
  );
}

export default Logo;
