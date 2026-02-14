"use client";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
    const [error, setError] = useState("");
    const searchParams = useSearchParams();

    useEffect(() => {
        async function autoLogin() {
            const userParam = searchParams.get("user");

            if (userParam === "user") {
                const res = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome: "user", password: "user" }),
                });

                if (res.ok) {
                    // Salva il parametro in un cookie temporaneo
                    document.cookie = "auto_login_user=user; path=/; max-age=10";
                    window.location.href = "/todo";
                } else {
                    setError("Auto-login fallito");
                }
            }
        }

        autoLogin();
    }, [searchParams]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        const redirectPath = searchParams.get("path") || "/";
        const otherParams = new URLSearchParams(searchParams);
        otherParams.delete("path");

        const form = e.currentTarget;
        const nome = form.nome.value;
        const password = form.password.value;

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, password }),
        });

        if (res.ok) {
            window.location.href = redirectPath;
        } else {
            setError("Nome o password errati");
        }
    }

    return (
        <div style={{ maxWidth: "300px", margin: "auto", paddingTop: "50px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="nome"
                    placeholder="Nome"
                    required
                    style={{ width: "100%", marginBottom: "10px" }}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    style={{ width: "100%", marginBottom: "10px" }}
                />
                <button type="submit" style={{ width: "100%" }}>
                    Login
                </button>
            </form>
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