"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ISettings {
  key: string;
  value: any;
}

interface ISettingsContext {
  basket: ISettings[];
}

export const SettingsContext = createContext<ISettingsContext | undefined>(
  undefined
);

export const useBasket = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("Use context inside provider!");
  }
  return context;
};

export function SettingsContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [settings, setSettings] = useState<ISettingsContext | undefined>(
    undefined
  );

  useEffect(() => {
    const url = new URL(
      `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/settings.json`
    );

    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
