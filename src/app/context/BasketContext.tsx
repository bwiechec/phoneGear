"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { IBasket } from "../lib/types/types";

interface IBasketContext {
  basket: IBasket[];
  setBasket: (newBasket: IBasket[]) => void; //Dispatch<SetStateAction<IBasket[]>>;
}

export const BasketContext = createContext<IBasketContext | undefined>(
  undefined
);

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("Use context inside provider!");
  }
  return context;
};

export function BasketContextProvider({ children }: { children: JSX.Element }) {
  const [basket, setBasket] = useState<IBasket[]>([]);

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}
