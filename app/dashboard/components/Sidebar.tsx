import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="text-white p-6 space-y-4">
          <h2 className="text-xl font-bold mb-6">Food Dashboard</h2>

          <Link href="/dashboard/random" className="hover:text-orange-400">
              Random Meal
            </Link>

          <nav className="flex flex-col gap-3">
            <Link href="/dashboard/abc" className="hover:text-orange-400">
              ABC
            </Link>

          </nav>
        </div>
  )
}
