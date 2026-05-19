import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900">
        <Sidebar />
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
}