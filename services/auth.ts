import NextAuth from "next-auth"
import Facebook from "next-auth/providers/facebook"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Facebook({
      authorization: {
        params: {
          scope: "public_profile",
        },
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized: ({ auth, request }) => {
      return !!auth?.user
    }
  }
})