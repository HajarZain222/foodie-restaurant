import Image from "next/image";
import Link from "next/link";
import Loading from "../loading";
import ExpandableText from "@/components/ExpandableText";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export default async function CategoriesList() {
    await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    { cache: "no-store" },
  );

  const data = await res.json();
  const categories: Category[] = data?.categories ?? [];

  return (

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.length ? (
          categories.map((cat) => (
            <div
              key={cat.idCategory}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="h-56 overflow-hidden">
                <Image
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  width={500}
                  height={500}
                  className="h-full w-full object-contain bg-white p-6 transition hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                  {cat.strCategory}
                </h2>

                {/* <p className="line-clamp-3 text-sm text-gray-500">
                  {cat.strCategoryDescription}
                </p> */}

                <ExpandableText text={cat.strCategoryDescription} wordLimit={11} />

                <Link
                  href={`/categories/${cat.idCategory}`}
                  className="mt-5 block w-full rounded-xl bg-orange-500 py-2 text-center font-medium text-white"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    
  )
}
