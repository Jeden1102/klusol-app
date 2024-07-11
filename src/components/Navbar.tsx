import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages";
function Navbar() {
  return (
    <div className="flex justify-between py-2">
      <Button variant="ghost" asChild>
        <Link href="#home">ZglosKlusola</Link>
      </Button>
      <div className="flex gap-4">
        {PAGES.map((page) => (
          <Button variant="ghost" asChild>
            <Link href={page.uri}>{page.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
