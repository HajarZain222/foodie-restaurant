export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      
      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500"></div>

        {/* Text */}
        <p className="text-gray-600 font-medium">
          Loading ...
        </p>

      </div>

    </div>
  );
}