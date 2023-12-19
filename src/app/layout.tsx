import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import { BasketContextProvider } from "./context/BasketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PhoneGear",
  description: "Everything for your phone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BasketContextProvider>
          <>
            <Menu />
            {children}
            <Footer />
          </>
        </BasketContextProvider>
      </body>
    </html>
  );
}
