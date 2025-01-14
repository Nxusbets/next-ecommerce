"use client";
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

export default function TopNav() {

    const { data, status } = useSession();
    //console.log(data, status);

    return (
        <nav className="nav shadow p-2 justify-content-between mb-3">
            <Link href="/" className="nav-link">Next E-commerce</Link>

            {status === "authenticated" ? (
                <>
                <Link href="/dashboard/user" className='nav-link'>
                {data?.user?.name}                   
                </Link>
                 <a className='nav-link pointer' onClick={() => signOut({ callbackUrl: "https://solid-space-waffle-wrvw96jqj495h57g7-3000.app.github.dev/login"})}
                    >Logout
                    </a>
                 </>
            ) : status === 'loading' ? (
                <a className='nav-link textt-danger'>Loading...</a>
                
            ) : (
                <div className='d-flex'>
                    <Link href="/login" className='nav-link'>
                       Login
                    </Link>

                    <div className='d-flex'>
                        <Link href="/register" className='nav-link'>
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
