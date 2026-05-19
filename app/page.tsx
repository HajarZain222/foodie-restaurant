import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "./loading";
import { Search, BookOpen, ChefHat } from "lucide-react";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

export const metadata = {
  title: "Home | Foodie Restaurant",
  description: "Discover delicious meals and recipes from around the world",
};

async function getCategoriesPreview() {
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php",
      { cache: "no-store" },
    );
    const data = await res.json();
    return data.categories?.slice(0, 4) || [];
  } catch {
    return [];
  }
}

async function getPopularMeals() {
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=",
      { cache: "no-store" },
    );
    const data = await res.json();
    return data.meals?.slice(0, 8) || [];
  } catch {
    return [];
  }
}

function HeroSection() {
  return (
    <section className="relative h-96 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="z-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Discover Delicious Meals
          </h1>
          <p className="mb-8 text-lg text-white/90 md:text-xl">
            Explore authentic recipes from cuisines around the world
          </p>
          <Link
            href="/meals"
            className="inline-block rounded-xl bg-white px-8 py-3 font-medium text-orange-500 transition hover:bg-gray-100"
          >
            Explore Meals
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoriesPreview({ categories }: { categories: Category[] }) {
  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Popular Categories</h2>
        <p className="mt-2 text-gray-600">
          Browse our selection of meal categories
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category: Category) => (
          <Link
            key={category.idCategory}
            href={`/categories/${category.idCategory}`}
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="h-40 overflow-hidden bg-gray-100">
                <Image
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  width={300}
                  height={300}
                  className="h-full w-full object-contain p-4 transition duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.strCategory}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PopularMeals({ meals }: { meals: Meal[] }) {
  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Popular Meals</h2>
        <p className="mt-2 text-gray-600">Check out these trending recipes</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {meals.map((meal: Meal) => (
          <div
            key={meal.idMeal}
            className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="h-48 overflow-hidden bg-gray-100">
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={400}
                height={400}
                className="h-full w-full object-cover transition duration-500 hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-800">
                {meal.strMeal}
              </h3>
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
                className="mt-4 block w-full rounded-xl bg-orange-500 py-2 text-center font-medium text-white transition hover:bg-orange-600"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/meals"
          className="inline-block rounded-xl border-2 border-orange-500 px-8 py-2 font-medium text-orange-500 transition hover:bg-orange-50"
        >
          View All Meals
        </Link>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Easy Search",
      description: "Find your favorite meals with our powerful search feature",
      icon: "search",
    },
    {
      title: "Explore Categories",
      description:
        "Discover meals organized by cuisine type and cooking method",
      icon: "book",
    },
    {
      title: "Watch Recipes",
      description: "Get detailed instructions for preparing your chosen meals",
      icon: "chef",
    },
  ];

  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Why Choose Us
        </h2>

        <p className="mt-2 text-gray-600">
          Everything you need to discover and cook amazing meals
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 text-orange-500">
              {feature.icon === "search" && (
                <Search className="h-10 w-10" />
              )}

              {feature.icon === "book" && (
                <BookOpen className="h-10 w-10" />
              )}

              {feature.icon === "chef" && (
                <ChefHat className="h-10 w-10" />
              )}
            </div>

            <h3 className="mb-3 text-xl font-semibold text-gray-800">
              {feature.title}
            </h3>

            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function Home() {
  const categories = await getCategoriesPreview();
  const meals = await getPopularMeals();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <HeroSection />

        <div className="mt-12">
          <Suspense fallback={<Loading />}>
            {categories.length > 0 && (
              <CategoriesPreview categories={categories} />
            )}
          </Suspense>
        </div>

        <div className="mt-12">
          <Suspense fallback={<Loading />}>
            {meals.length > 0 && <PopularMeals meals={meals} />}
          </Suspense>
        </div>

        <div className="mt-12">
          <FeaturesSection />
        </div>
      </div>
    </div>
  );
}
