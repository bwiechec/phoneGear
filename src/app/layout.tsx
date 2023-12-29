import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import { BasketContextProvider } from "./context/BasketContext";
import { SettingsContextProvider } from "./context/SettingsContext";

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
  const BuildProviderTree: any = (providers: any) => {
    if (providers.length === 1) {
      return providers[0];
    }
    const A = providers.shift();
    const B = providers.shift();
    return BuildProviderTree([
      ({ children }: any) => (
        <A>
          <B>{children}</B>
        </A>
      ),
      ...providers,
    ]);
  };

  const Providers = BuildProviderTree([
    BasketContextProvider,
    SettingsContextProvider,
  ]);

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <>
            <Menu />
            {children}
            <Footer />
          </>
        </Providers>
      </body>
    </html>
  );
}
