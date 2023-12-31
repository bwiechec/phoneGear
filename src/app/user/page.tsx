import { Typography } from "@mui/material";
import styles from "./page.module.css";
import { IOrder } from "../lib/types/types";

export default async function Page() {
  const orders = await getOrderData();
  return (
    <div className={styles.user_container}>
      <div className={styles.user}>
        <Typography variant="h5" fontWeight={600} textAlign={"center"}>
          Previous orders
        </Typography>
        {!orders.length && (
          <Typography textAlign={"center"} pt={2}>
            You didn&apos;t place any orders yet!
          </Typography>
        )}
        {orders.map((order) => {
          return (
            <div key={order.id}>
              {order.totalValue} {order.orderDate}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const getOrderData = async () => {
  const res = await fetch(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/order.json`,
    { cache: "no-store" }
  );
  const data: IOrder[] = await res.json();
  let products = [];
  for (const key in data) {
    products.push({
      id: key,
      basketContent: data[key].basketContent,
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
