import Image from "next/image";
import Link from "next/link";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  [key: string]: string;
}

export default async function MealDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const data = await res.json();
  const meal: Meal = data.meals[0];

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Back */}
        <Link
          href="/meals"
          className="mb-6 inline-flex items-center gap-2 text-sm text-orange-500 hover:underline"
        >
          ← Back to Meals
        </Link>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          {/* Image */}
          <div className="relative h-80 w-full">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Title */}
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              {meal.strMeal}
            </h1>

            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-4">
              <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-500">
                {meal.strCategory}
              </span>

              <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-600">
                {meal.strArea}
              </span>
            </div>

            {/* Ingredients */}
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Ingredients
            </h2>

            <ul className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ingredients.map(({ ingredient, measure }, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-3 text-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-orange-400" />

                  <span className="font-medium text-gray-700">
                    {measure}
                  </span>

                  <span className="text-gray-500">{ingredient}</span>
                </li>
              ))}
            </ul>

            {/* Instructions */}
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Instructions
            </h2>

            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
              {meal.strInstructions}
            </p>

            {/* YouTube */}
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
              >
                ▶ Watch on YouTube
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}