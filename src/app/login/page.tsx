"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();

    const userParam = searchParams.get("user"); // sarà "user"

    async function login(nome: string, password: string) {
        setLoading(true);
        setError("");

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, password }),
        });

        if (res.ok) {
            const redirectPath = searchParams.get("path") || "/";
            const params = new URLSearchParams(searchParams);
            params.delete("path");
            params.delete("user");

            const qs = params.toString();
            window.location.href = qs ? `${redirectPath}?${qs}` : redirectPath;
        } else {
            setError("Login fallito");
            setLoading(false);
        }
    }

    // 👉 LOGIN AUTOMATICO
    useEffect(() => {
        if (userParam === "user") {
            login("user", "user"); // password fissa
        }
    }, [userParam]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        login(form.nome.value, form.password.value);
    }

    if (loading) return <p>Login in corso...</p>;

    return (
        <div style={{ maxWidth: 300, margin: "auto", paddingTop: 50 }}>
            <h2>Login</h2>

            {!userParam && (
                <form onSubmit={handleSubmit}>
                    <input name="nome" placeholder="Nome" required />
                    <input name="password" type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Caricamento...</div>}>
            <LoginForm />
        </Suspense>
    );
}
