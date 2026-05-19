import Image from "next/image";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default async function RandomMealPage() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php",
    { cache: "no-store" }
  );

  const data = await res.json();
  const meal: Meal = data?.meals?.[0];

  if (!meal) {
    return <p className="text-gray-500">No meal found</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Random Meal 🎲</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-md">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={400}
          height={400}
        />

        <h2 className="text-2xl font-semibold mt-4">
          {meal.strMeal}
        </h2>
      </div>
    </div>
  );
}