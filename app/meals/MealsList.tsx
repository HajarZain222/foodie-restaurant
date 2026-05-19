"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";


interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

export default function MealsList({
  meals,
  strArea,
  search,
}: {
  meals: Meal[];
  strArea: string;
  search: string;
}) {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  // Filter
  const filteredMeals = meals
  .filter((meal) =>
    strArea === "All" ? true : meal.strArea === strArea
  )
  .filter((meal) =>
    search
      ? meal.strMeal.toLowerCase().includes(search.toLowerCase())
      : true
  );

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = (meal: Meal) => {
    const exists = favorites.some((m) => m.idMeal === meal.idMeal);

    let updated;

    if (exists) {
      updated = favorites.filter((m) => m.idMeal !== meal.idMeal);
    } else {
      updated = [...favorites, meal];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredMeals.map((meal) => {
        const isFavorite = favorites.some((m) => m.idMeal === meal.idMeal);

        return (
          <div
            key={meal.idMeal}
            className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={400}
                height={400}
                className="h-full w-full object-cover transition duration-500 hover:scale-110"
              />

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(meal)}
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-md backdrop-blur transition-all duration-300"
              >
                <Heart
                  size={20}
                  className={`
                    transition-all duration-300
                    ${
                      isFavorite
                        ? "fill-orange-500 text-orange-500"
                        : "text-orange-500"
                    }
                  `}
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="mb-2 line-clamp-2 text-xl font-semibold text-gray-800">
                {meal.strMeal}
              </h2>

              <p className="text-sm text-gray-500">
                Category:
                <span className="font-medium text-orange-500">
                  {" "}
                  {meal.strCategory}
                </span>
              </p>

              <p className="text-sm text-gray-500">
                Cuisine:
                <span className="font-medium text-gray-700">
                  {" "}
                  {meal.strArea}
                </span>
              </p>

              <Link
  href={`/meals/${meal.idMeal}`}
  className="mt-5 block w-full rounded-xl bg-orange-500 py-2 text-center font-medium text-white transition hover:bg-orange-600"
>
  View Recipe
</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
