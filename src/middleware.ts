import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const loggedInRoutes = ["/profile","/profile/update-password", "/profile/moments", "/profile/travels", "/create-travel"];
const loggedOutRoutes = ["/login", "/register"];

export default async function AuthMiddleware(
    req: NextRequest
): Promise<NextResponse> {
    if (
        !loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path)) &&
        !loggedOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
    ) {
        return NextResponse.next();
    } else {
        const myCookie = cookies();

        let token: string | null = null;
        if (myCookie.get("authToken")) {
            token = myCookie.get("authToken")!.value;
        }

        if (
            !token &&
            loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
        ) {
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);
        } else if (
            token &&
            loggedOutRoutes.some((path) =>
                req.nextUrl.pathname.startsWith(path)
            )
        ) {
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
        }
    }

    return NextResponse.next();
}
