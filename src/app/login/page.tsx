"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
    const [error, setError] = useState("");
    const searchParams = useSearchParams();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        // Prendi il parametro "path" che contiene la destinazione
        const redirectPath = searchParams.get("path") || "/";
        // Prendi gli altri parametri (es: item, filter, ecc.)
        const otherParams = new URLSearchParams(searchParams);
        const checkIfUser = otherParams.toString()
        const params = otherParams.toString();//final url

        let form = e.currentTarget;
        let nome
        let password
        if (checkIfUser == "user") {
            nome = "user"
            password = "user"
        }
        else {
            nome = form.nome.value;
            password = form.password.value;
        }
        otherParams.delete("path"); // Rimuovi "path" dai parametri
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, password }),
        });

        if (res.ok) {

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