"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const removeFromFavorites = (id: string) => {
    const updated = favorites.filter((meal) => meal.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (!mounted) return null;

  if (!favorites.length) {
    return (
      <p className="text-gray-500 text-center mt-10">
        No favorite meals yet 
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {favorites.map((meal) => (
        <div
          key={meal.idMeal}
          className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-2xl"
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />

            <button
              onClick={() => removeFromFavorites(meal.idMeal)}
              className="group absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-orange-500"
            >
              <Heart
                size={20}
                className="fill-orange-500 text-orange-500 transition group-hover:fill-white group-hover:text-white"
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-5">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              {meal.strMeal}
            </h2>

            <p className="text-sm text-gray-500">
              Category:{" "}
              <span className="font-medium text-orange-500">
                {meal.strCategory}
              </span>
            </p>

            <p className="text-sm text-gray-500">
              Cuisine:{" "}
              <span className="font-medium text-gray-700">{meal.strArea}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
