import Link from "next/link";

export default function AdminNav() {
    return (
        <nav className="nav justify-content-center mb-3">
            <link href="/dashboard/admin" className="nav-link">Admin</link>
        
            <link href="/dashboard/admin/category" className="nav-link">Create category</link>
        </nav>
    )
}
