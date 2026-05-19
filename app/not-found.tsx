import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">

      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Oops!
      </h1>

      <h2 className="text-2xl font-semibold text-orange-500 mb-3">
        This meal is not found
      </h2>

      <p className="text-gray-500 mb-6">
        Looks like this recipe disappeared from the kitchen.
      </p>

      <div className="flex gap-4">

        <Link
          href="/"
          className="rounded-xl bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
        >
          Go Home
        </Link>

        <Link
          href="/meals"
          className="rounded-xl border border-orange-500 px-5 py-2 text-orange-500 hover:bg-orange-100"
        >
          Explore Meals
        </Link>

      </div>

    </div>
  );
}