"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:8082/auth/success", {
          credentials: "include",
        });
        const data = await res.json();
        console.log("Logged in user:", data);

        // Save to local storage or context
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("accessToken", data["access token"]);
        localStorage.setItem("refreshToken", data["refresh token"]);

        // Redirect to home/dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("Error fetching user after login:", error);
      }
    }

    fetchUser();
  }, []);

  return <div className="text-white">Logging in, please wait...</div>;
}
