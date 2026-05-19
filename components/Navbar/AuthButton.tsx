import { auth } from "@/services/auth"
import Image from "next/image"
import Link from "next/link"

export default async function AuthButton() {
  const session = await auth()

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full ring-2 ring-orange-300"
          />
        )}
        <Link
          href="/logout"
          className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition-all duration-300"
        >
          Logout
        </Link>
      </div>
    )
  }

  return (
    <Link
      href="/login"
      className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-medium text-white shadow hover:bg-orange-600 transition-all duration-300"
    >
      Login
    </Link>
  )
}