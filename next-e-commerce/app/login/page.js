"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, userSearchParams, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

export default function Login() {
   
    const [email, setEmail] = useState("ryan@gmail.com");
    const [password, setPassword] = useState("rrrrrr");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            
                const result = await signIn('credentials', {
                    redirect: false,
                    email,
                    password,
                });
            if(result?.error) {
                toast.error(result?.error);
                setLoading(false);
            } else {
                toast.success("Logged in successfully");
               // router.push("/");
               router.push(callbackUrl);
            }
           
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };


    return (
        <main>
            <div className="container">
                <div className="row d-flex justify-content-center align-itemscenter
        vh-100">
                    <div className="col-lg-5 bg-light p-5 shadow">
                        <h2 className="mb-4">Login</h2>
                        <form onSubmit={handleSubmit}>
                           
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control mb-4"
                                placeholder="Your email"
        />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control mb-4"
                                placeholder="Your password"
                            />
                            <button
                                className="btn btn-primary btn-raised"
                                disabled={loading || !email || !password}
                            >
                                {loading ? "Please wait.." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

