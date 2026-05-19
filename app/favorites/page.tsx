import FavoritesList from "./FavoritesList";

export default function Favorites() {

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h2 className="mb-8 text-3xl font-bold text-gray-800">
        Favorite Meals 
      </h2>

      <FavoritesList />
      
    </div>
  );
}