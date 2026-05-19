import FilterComponent from "@/components/Filter/page";
import MealsList from "./MealsList";

export const metadata = {
  title: "Meals",
  description: "Meals Page",
};

export default async function Meals({
  searchParams,
}: {
  searchParams: Promise<{ strArea?: string; search?: string }>; 
}) {

  const { strArea = "All", search = "" } = await searchParams; 

  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const data = await res.json();
  const meals = data.meals || [];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="mb-8 text-3xl font-bold text-gray-800">Meals Recipes</h2>
      <FilterComponent meals={meals} />
      <MealsList meals={meals} strArea={strArea} search={search} />
    </div>
  );
}