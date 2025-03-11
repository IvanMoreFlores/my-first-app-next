"use client";
import "@/app/globals.css";
import { ToastProvider } from "@/presentation/context/ToastContext";
import ApolloProvider from "@/presentation/components/data-graphql/ApiClient";
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
              <ApolloProvider>
                <UserProvider>{children}</UserProvider>
              </ApolloProvider>
            </body>
          </ToastProvider>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
