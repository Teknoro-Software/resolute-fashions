"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(
                "/api/admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data =
                await res.json();

            if (!data.success) {
                alert(
                    data.message
                );
                return;
            }

            router.push(
                "/admin/dashboard"
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8]">

            <form
                onSubmit={handleLogin}
                className="bg-white w-full max-w-md rounded-3xl border p-8"
            >

                <h1 className="text-3xl font-bold mb-2">
                    Admin Login
                </h1>

                <p className="text-gray-500 mb-8">
                    Sign in to continue
                </p>

                <div className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-black text-white h-12 rounded-xl"
                >
                    {loading
                        ? "Logging in..."
                        : "Login"}
                </button>

            </form>

        </div>
    );
}