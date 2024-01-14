"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { IBasket, IOrder } from "../lib/types/types";

interface OrdersContext {
  orders: {
    id: string;
    basketContent: IBasket[];
    is_sliced: boolean;
    sliced_count: number;
    deliveryType: string;
    deliveryValue: number;
    paymentType: string;
    status: string;
    totalValue: number;
    orderDate: string;
  }[];
}

export const OrdersContext = createContext<OrdersContext | undefined>(
  undefined
);

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("Use context inside provider!");
  }
  return context;
};

export function OrdersContextProvider({
  children,
  value,
}: {
  children: JSX.Element;
  value: {
    id: string;
    basketContent: IBasket[];
    is_sliced: boolean;
    sliced_count: number;
    deliveryType: string;
    deliveryValue: number;
    paymentType: string;
    status: string;
    totalValue: number;
    orderDate: string;
  }[];
}) {
  return (
    <OrdersContext.Provider value={{ orders: value }}>
      {children}
    </OrdersContext.Provider>
  );
}
