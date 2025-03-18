"use client";
import "@/app/globals.css";
import { ToastProvider } from "@/presentation/context/ToastContext";
import { ThemeProvider } from "@/presentation/theme/themeProvider";
import { UserProvider } from "@/presentation/context/UserConext";
import { Provider } from "react-redux";
import store from "@/presentation/state/redux/store";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <html lang="en">
          <ToastProvider>
            <body>
            <UserProvider>{children}</UserProvider>
            </body>
          </ToastProvider>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
