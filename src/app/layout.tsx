import type { Metadata } from "next";
import "@/app/globals.css";
import { ToastProvider } from "@/presentation/context/ToastContext";
import ApolloProvider from "@/presentation/components/data-graphql/ApiClient";
import { ThemeProvider } from "@/presentation/theme/themeProvider";

export const metadata: Metadata = {
  title: "Next",
  description: "Mi primer poryecto con next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <ToastProvider>
          <body>
            <ApolloProvider>{children} </ApolloProvider>
          </body>
        </ToastProvider>
      </html>
    </ThemeProvider>
  );
}
