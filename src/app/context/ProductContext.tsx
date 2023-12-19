"use client";

import { createContext, useContext } from "react";
import { IProducts } from "../lib/types/product";

export const ProductContext = createContext<IProducts | undefined>(undefined);

export const useProduct = () => {
  return useContext(ProductContext);
};

export function ProductContextProvider({
  children,
  value,
}: {
  children: JSX.Element;
  value: IProducts | undefined;
}) {
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
