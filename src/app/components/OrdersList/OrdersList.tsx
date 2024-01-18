"use client";
import { useOrders } from "@/app/context/OrderContext";
import Typography from "@mui/material/Typography";
import styles from "./OrdersList.module.css";
import { GearButton } from "../GearButton/GearButton";
import Link from "next/link";
import OrderItem from "../OrderItem/OrderItem";
import OrderCard from "../OrderCard/OrderCard";

export default function OrdersList() {
  const { orders } = useOrders();
  return (
    <>
      {orders.map((order) => {
        return <OrderCard order={order} onList={true} key={order.id} />;
      })}
    </>
  );
}
