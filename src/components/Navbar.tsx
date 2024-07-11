import Link from "next/link";

import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <div className="flex justify-between">
      <Button asChild>
        <Link href="#home">Home</Link>
      </Button>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="#home">Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
