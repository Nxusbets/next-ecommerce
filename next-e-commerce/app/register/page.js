"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
    const [name, setName] = useState("Ryan");
    const [email, setEmail] = useState("ryan@gmail.com");
    const [password, setPassword] = useState("rrrrrr");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await fetch(`${process.env.API}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.err);
                setLoading(false);
            } else {
                toast.success(data.success);
                router.push("/login");
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
                        <h2 className="mb-4">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control mb-4"
                                placeholder="Your name"
                            />
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
                                disabled={loading || !name || !email || !password}
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

