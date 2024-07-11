"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages";
import {
  BookOpenIcon,
  ChevronRightIcon,
  MessagesSquareIcon,
  ThumbsUpIcon,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

function Navbar() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);

    const action = isMenuOpened ? "remove" : "add";

    document.body.classList[action]("overflow-hidden");
  };

  return (
    <div className="flex justify-between py-2 sm:px-32">
      <Button variant="ghost" asChild>
        <Link href="#home">ZglosKlusola</Link>
      </Button>
      <div
        className={cn(
          "gap-4 fixed transition-all -translate-y-4 left-0 opacity-0  sm:opacity-100  sm:translate-y-0 top-14 py-4 items-center shadow-lg z-50 bg-white sm:w-fit flex sm:flex-row flex-col w-full sm:bg-none sm:shadow-none sm:py-0 sm:static",
          {
            "opacity-100 translate-y-0": isMenuOpened,
          }
        )}
      >
        {PAGES.map((page) => (
          <Button className="w-fit" variant="ghost" asChild>
            <Link href={page.uri}>{page.name}</Link>
          </Button>
        ))}
        <Button variant="default" className="w-fit" asChild>
          <Link href="#report">Report</Link>
        </Button>
      </div>
      <Button
        className="flex items-center justify-center sm:hidden"
        variant="ghost"
        onClick={() => toggleMenu()}
      >
        <Menu />
      </Button>
    </div>
  );
}

export default Navbar;
