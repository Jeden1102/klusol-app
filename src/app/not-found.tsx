import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-4 py-16 mx-auto text-center lg:px-8 lg:py-48 max-w-7xl sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">404</span>{" "}
          <span className="block text-primary xl:inline">
            Strona nie istnieje
          </span>
        </h1>
        <p className="mx-auto mt-4 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg md:mt-5 md:text-xl lg:mx-0">
          Oops! Podana strona nie istnieje.
        </p>
        <div className="mt-10 sm:flex sm:justify-center">
          <div className="rounded-md shadow">
            <Link
              href="/"
              className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-primary border border-transparent rounded-md md:py-4 md:text-lg md:px-10"
            >
              Powrot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
