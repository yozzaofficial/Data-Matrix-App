"use client";
import { useEffect } from "react";

export default function AutoLoginClient() {
  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        const params = new URLSearchParams(window.location.search);
        const user = params.get("user");
        if (!user) return;

        // avoid repeating login if session cookie already present
        if (document.cookie.split("; ").some((c) => c.startsWith("session="))) {
          // remove user param from URL
          params.delete("user");
          const url = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
          window.history.replaceState({}, "", url);
          return;
        }

        // call login API with default credentials for this auto-login flow
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: user, password: user }),
          credentials: "same-origin",
        });

        if (!mounted) return;

        if (res.ok) {
          // remove user param and reload so server sees the cookie
          params.delete("user");
          const url = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
          // reload to ensure server-side fetches will see the cookie
          window.location.replace(url);
        } else {
          // failed auto-login; remove param to avoid loops
          params.delete("user");
          const url = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
          window.history.replaceState({}, "", url);
        }
      } catch (err) {
        console.error("AutoLoginClient error", err);
      }
    }

    run();

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}
