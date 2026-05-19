// import { NextResponse } from "next/server";
import { auth } from "./services/auth";

// export function middleware(req: Request) {
//     return NextResponse.redirect(new URL('/', req.url));
// }

export const middleware = auth;

export const config = {
    matcher: '/dashboard',
};