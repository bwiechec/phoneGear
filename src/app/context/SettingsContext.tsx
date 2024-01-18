"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface ISettings {
  delivery_price: number;
  free_delivery: number;
}

interface ISettingsContext {
  delivery_price: number;
  free_delivery: number;
}

export const SettingsContext = createContext<ISettingsContext | undefined>(
  undefined
);

export const useSettings = () => {
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

    axios(url.toString()).then((res) => {
      setSettings(res.data);
    });
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
