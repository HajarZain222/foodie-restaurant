import Image from "next/image";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();
  const categories: Category[] = data?.categories ?? [];

  const category = categories.find(
    (category) => category.idCategory === id
  );

  if (!category) {
    return (
      <div className="p-8 text-xl text-red-500">
        Category not found
      </div>
    );
  }

  const categoryName = category.strCategory;

  const mealsRes = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
      categoryName
    )}`,
    { cache: "no-store" }
  );

  if (!mealsRes.ok) {
    throw new Error("Failed to fetch meals");
  }

  const mealsData = await mealsRes.json();
  const meals: Meal[] = mealsData?.meals ?? [];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-4xl font-bold text-gray-800">
        {categoryName} Meals
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {meals.length ? (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="overflow-hidden rounded-2xl bg-white shadow-md"
            >
              <div className="h-56 overflow-hidden">
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold">{meal.strMeal}</h2>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No meals found</p>
        )}
      </div>
    </div>
  );
}
