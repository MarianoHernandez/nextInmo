"use client";

import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedPage({ children }: { children: React.ReactNode }) {
  const { token } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login"); // Redirecciona al login si no hay token
    }
  }, [token, router]);

  if (!token) {
    return null; // o podrías poner un loader si querés
  }

  return <>{children}</>;
}
