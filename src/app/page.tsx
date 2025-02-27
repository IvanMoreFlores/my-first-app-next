"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      router.push("/listado");
      return;
    }
    router.push("/login");
  }, [router]);

  return <div>Cargando...</div>;
}
