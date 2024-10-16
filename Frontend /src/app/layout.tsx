import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdConfigProvider from "@/lib/providers/antdProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import SideBar from "@/components/sideBar";
import { StoreProvider } from "@/lib/providers/storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloit",
  description: "Cloit the next generation",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icons/logo.svg"
          sizes="180x180"
          type="image/svg+xml"
        />
      </head>
      <body className={inter.className}>
        <AntdRegistry>
          <AntdConfigProvider>
            <StoreProvider>
              <SideBar>{children}</SideBar>
            </StoreProvider>
          </AntdConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
