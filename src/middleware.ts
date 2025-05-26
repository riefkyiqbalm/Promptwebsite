import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const isLogin = true;

export function middleware(request: NextRequest) {

    if (!isLogin) {
        return NextResponse.redirect(new URL("/", request.url))  //logout cond
    }

};

export const config = {
    matcher: "/dashboard/:path*",
}