import "@radix-ui/themes/styles.css";
import "react-day-picker/dist/style.css";
import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { Theme } from "@radix-ui/themes";
import { TRPCReactProvider } from "~/trpc/react";
import { ToastProvider } from "./_components/toast";
import { TopBar } from "./_components/ui/top-bar/top-bar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "LunaTrek",
  description: "Okrs for everyone",
  icons: [{ rel: "icon", url: "/star-and-crescent-bold.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-[#fffafa] font-sans ${inter.variable}`}>
        <Theme>
          <ToastProvider>
            <TRPCReactProvider cookies={cookies().toString()}>
              <TopBar />
              {children}
            </TRPCReactProvider>
          </ToastProvider>
        </Theme>
      </body>
    </html>
  );
}
