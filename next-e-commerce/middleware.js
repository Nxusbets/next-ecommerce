//export { default } from "next-auth/middleware";

import {withAuth} from 'next/auth/middeleware';
import { NextResponse } from 'next/server';

export const config = { matcher: ["/dashboard/:path*", "/api/user/:path*", "/api/user/:path*"] };

export default withAuth(
    async function middeleware(requ) {
        const url = req.nextUrl.pathname;
        const userRole = req?.nextAuth?.token?.user?.role;

        if(url?.includes("/admin") && userRole !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }, {
        callbacks: {
            authorized: ({ token }) => {
                if (!token) {
                    return false;
                }
            }
        }
    }
);