import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Memory Will",
  description: "Kill an agent and restore only the memory you allowed."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="grass" grayColor="sage" radius="small" scaling="100%">
          {children}
        </Theme>
      </body>
    </html>
  );
}
