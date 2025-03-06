"use client";
import React, { createContext, useContext, useState } from "react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "loading";
}

interface ToastContextType {
  addToast: (message: string, type: "success" | "error" | "loading") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: "success" | "error" | "loading") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 20000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Contenedor de Toasts en la parte inferior derecha */}
      <div className="fixed bottom-5 left-5 right-5 space-y-3 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex my-20 mx-20 items-center gap-3 px-10 py-10 rounded-lg shadow-lg text-black transition-opacity text-lg font-semibold ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
          >
            {toast.type === "success" && "✅"}
            {toast.type === "error" && "❌"}
            {toast.type === "loading" && "⏳"}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return context;
};
