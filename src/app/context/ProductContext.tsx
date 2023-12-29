"use client";

import { createContext, useContext } from "react";
import { IProduct } from "../lib/types/product";

export const ProductContext = createContext<IProduct | undefined>(undefined);

export const useProduct = () => {
  return useContext(ProductContext);
};

export function ProductContextProvider({
  children,
  value,
}: {
  children: JSX.Element;
  value: IProduct | undefined;
}) {
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
