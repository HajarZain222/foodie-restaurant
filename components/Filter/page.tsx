"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Meal {
  strArea: string;
}

export default function FilterComponent({
  meals,
}: {
  meals: Meal[];
}) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const current = searchParams.get("strArea") || "All";

  const areas = [
    "All",
    ...new Set(meals.map((meal) => meal.strArea)),
  ];

  const handleFilter = (area: string) => {
    router.push(`/meals?strArea=${area}`);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-3">

      {areas.map((area) => (
        <button
          key={area}
          onClick={() => handleFilter(area)}
          className={`
            rounded-full border px-4 py-2 transition
            ${
              current === area
                ? "bg-orange-500 text-white"
                : "text-orange-500"
            }
          `}
        >
          {area}
        </button>
      ))}

    </div>
  );
}