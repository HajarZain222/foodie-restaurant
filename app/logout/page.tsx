import { auth, signOut } from "@/services/auth"
import Image from "next/image"
import { redirect } from "next/navigation"

export default async function Logout() {
  const session = await auth()

  // لو مش logged in، روح الـ home
  if (!session) redirect("/")

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-2xl border p-10 shadow-md text-center space-y-6">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full mx-auto ring-4 ring-orange-300"
          />
        )}
        <div>
          <p className="font-semibold text-gray-800 text-lg">{session.user?.name}</p>
          <p className="text-gray-400 text-sm">{session.user?.email}</p>
        </div>

        <form
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/" })
          }}
        >
          <button
            type="submit"
            className="rounded-xl bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}