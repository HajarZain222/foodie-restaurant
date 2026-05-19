"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const [value, setValue] = useState(currentSearch);

  const handleSearch = () => {
    const query = value.trim();

    if (!query) {
      router.push("/meals");
      return;
    }

    router.replace(`/meals?search=${query}`)
  };

  return (
    <div className="flex items-center gap-2">
      
      {/* Input */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search meals..."
        className="w-full rounded-xl border px-4 py-2 outline-none focus:border-orange-500"
      />

      {/* Button */}
      <button
        onClick={handleSearch}
        className="rounded-xl bg-orange-500 px-5 py-2 text-white transition hover:bg-orange-600"
      >
        Search
      </button>

    </div>
  );
}