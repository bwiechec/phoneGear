import { Typography } from "@mui/material";
import styles from "./page.module.css";
import { IOrderApi } from "../lib/types/types";
import Image from "next/image";
import { GearButton } from "../components/GearButton/GearButton";
import Link from "next/link";
import { OrdersContextProvider } from "../context/OrderContext";
import OrdersList from "../components/OrdersList/OrdersList";
import axios from "axios";

const PRODUCT_SHOW_COUNT = 3;

export default async function Page() {
  const orders = await getOrdersData();
  return (
    <div className={styles.user_container}>
      <Typography variant="h5" fontWeight={600} textAlign={"left"} p={2}>
        Previous orders
      </Typography>
      {!orders.length && (
        <div className={styles.user}>
          <Typography textAlign={"center"} pt={2}>
            You didn&apos;t place any orders yet!
          </Typography>
        </div>
      )}

      <OrdersContextProvider value={orders}>
        <OrdersList />
      </OrdersContextProvider>
    </div>
  );
}

const getOrdersData = async () => {
  const res = await axios<IOrderApi[]>(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/order.json`
  );
  const data: IOrderApi[] = res.data;
  let products = [];
  for (const key in data) {
    products.push({
      id: key,
      basketContent: data[key].basketContent.slice(0, PRODUCT_SHOW_COUNT),
      is_sliced: data[key].basketContent.length > PRODUCT_SHOW_COUNT,
      sliced_count: data[key].basketContent.length - PRODUCT_SHOW_COUNT,
      deliveryType: data[key].deliveryType,
      deliveryValue: data[key].deliveryValue,
      paymentType: data[key].paymentType,
      status: data[key].status,
      totalValue: data[key].totalValue,
      orderDate: data[key].orderDate,
    });
  }

  return products;
};

export const dynamic = "force-dynamic";
