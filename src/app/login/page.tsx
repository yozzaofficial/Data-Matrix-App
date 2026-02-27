"use client";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
    const [error, setError] = useState("");
    const searchParams = useSearchParams();

    useEffect(() => {
        async function autoLogin() {
            const pathValue = searchParams.get("path") || "";
            const filterValue = searchParams.get("id") || ""
            console.log(pathValue)
            // Controlla se "user=user" è dentro il path
            const hasAutoLogin = searchParams.get("user") || "";
            console.log(hasAutoLogin)
            if (hasAutoLogin!=="") {
                const res = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome: "user", password: "user" }),
                });

                if (res.ok) {
                    // Il path già contiene tutto: "todo?user=user"
                    window.location.href = `${pathValue}?id=${filterValue}`;
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
            const params = otherParams.toString();
            const fullUrl = params ? `${redirectPath}?${params}` : redirectPath;
            window.location.href = fullUrl;
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