"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function TodoPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const userParam = searchParams.get("user"); // "user"

    useEffect(() => {
        async function checkLogin() {
            const me = await fetch("/api/me");

            if (me.ok) {
                setLoading(false);
                return;
            }

            if (userParam === "user") {
                const res = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nome: "user",
                        password: "user",
                    }),
                });

                if (res.ok) {
                    router.replace("/todo");
                    setLoading(false);
                    return;
                }
            }

            router.replace("/login?path=/todo");
        }

        checkLogin();
    }, [userParam, router]);

    if (loading) return <p>Caricamento...</p>;

    return (
        <div>
            <h1>Todo</h1>
        </div>
    );
}
