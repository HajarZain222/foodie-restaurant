import { Suspense } from "react";
import CategoriesList from "./CategoriesList";
import Loading from "../loading";

export const metadata = {
  title: "Categories",
  description: "Categories Page",
};

export default function Categories() {
  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="mb-8 text-3xl font-bold text-gray-800">Categories</h2>

      <Suspense fallback={<Loading/>}>
        <CategoriesList />
      </Suspense>

      
    </div>
  );
}
