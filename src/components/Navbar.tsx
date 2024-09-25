"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages";
import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TbFishOff } from "react-icons/tb";

function Navbar() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <div className="flex justify-between py-2 sm:px-4 md:px-20 lg:px-32 fixed bg-white w-full z-50 md:static">
      <Button variant="ghost" asChild>
        <Link href="#start" className="text-xl font-semibold">
          Zgłoś
          <span className="font-bold text-primary">Kłusownika</span>
          <TbFishOff className="text-3xl" />
        </Link>
      </Button>
      <div
        className={cn(
          "gap-4 fixed transition-all -translate-y-4 left-0 opacity-0 pointer-events-none sm:pointer-events-auto sm:opacity-100  sm:translate-y-0 top-14 py-4 items-center shadow-lg z-50 bg-white sm:w-fit flex sm:flex-row flex-col w-full sm:bg-none sm:shadow-none sm:py-0 sm:static",
          {
            "opacity-100 translate-y-0 pointer-events-auto": isMenuOpened,
          }
        )}
      >
        {PAGES.map((page) => (
          <Button
            className="w-fit"
            variant="ghost"
            asChild
            key={page.uri}
            onClick={() => toggleMenu()}
          >
            <Link href={page.uri}>{page.name}</Link>
          </Button>
        ))}
        <Button
          variant="default"
          className="w-fit"
          asChild
          onClick={() => toggleMenu()}
        >
          <Link href="#zglos">Zgłoś</Link>
        </Button>
      </div>
      <Button
        className="flex items-center justify-center sm:hidden"
        variant="ghost"
        title="Otworz menu"
        onClick={() => toggleMenu()}
      >
        <Menu />
      </Button>
    </div>
  );
}

export default Navbar;
