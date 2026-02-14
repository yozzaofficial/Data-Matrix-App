"use client";
import { useEffect } from "react";

export default function AutoLoginClient() {
    useEffect(() => {
        async function run() {
            try {
                const search = new URLSearchParams(window.location.search);
                const user = search.get("user");
                if (!user) return;

                // if session cookie already present, do nothing
                if (document.cookie.split("; ").some(c => c.startsWith("session="))) return;

                // call API that returns JSON { sessionId }
                const res = await fetch(`/api/autologin-client?user=${encodeURIComponent(user)}`, {
                    method: "GET",
                    credentials: "same-origin",
                    headers: { Accept: "application/json" },
                });

                if (!res.ok) return;
                const data = await res.json();
                if (data?.sessionId) {
                    document.cookie = `session=${data.sessionId}; Path=/; SameSite=Lax`;
                    // navigate to clean path without query
                    const url = new URL(window.location.href);
                    url.searchParams.delete("user");
                    window.location.replace(url.pathname + url.search);
                }
            } catch (err) {
                console.error("autologin client error", err);
            }
        }

        run();
    }, []);

    return null;
}
