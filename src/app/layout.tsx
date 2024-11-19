import Provider from "@/components/tanstacProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { Root } from "@/components/root";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="max-w-[480px] mx-auto">
        <Root>
          <Provider>
            {children}
            <Toaster position="top-center" />
          </Provider>
        </Root>
      </body>
    </html>
  );
}
