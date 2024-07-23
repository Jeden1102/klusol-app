import Link from "next/link";
import { PAGES } from "../config/pages";

export default function Component() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="dark bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="flex items-center space-x-4">
          <Link href="/">ZglosKlusola</Link>
        </div>
        <div className="flex items-center space-x-4">
          {PAGES.map((page) => (
            <Link
              key={page.uri}
              href={page.uri}
              className="text-sm text-gray-300"
            >
              {page.name}
            </Link>
          ))}
        </div>

        <p className="mt-4 md:mt-0 text-sm text-gray-300 md:ml-auto">
          &copy; {currentYear} ZglosKlusola, wszelkie prawa zastrzeżone.
        </p>
      </div>
    </div>
  );
}
