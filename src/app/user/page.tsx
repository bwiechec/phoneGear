import { Typography } from "@mui/material";
import styles from "./page.module.css";
import { IOrder } from "../lib/types/types";
import Image from "next/image";
import { useSettings } from "../context/SettingsContext";

export default async function Page() {
  const orders = await getOrderData();
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

      {orders.map((order) => {
        return (
          <div className={styles.user_item} key={order.id}>
            {order.orderDate && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "0.25rem",
                  gap: "2rem",
                }}
              >
                <Typography fontWeight={600}>order date</Typography>{" "}
                <Typography fontWeight={600}>{order.orderDate}</Typography>
              </div>
            )}
            {order.basketContent.map((item) => {
              return (
                <>
                  <div className={styles.user_item_order_product}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        loading="lazy"
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        width={75}
                        height={75}
                        style={{ height: "auto" }}
                      />
                      <Typography>{item.product.name}</Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5rem",
                      }}
                    >
                      <Typography>
                        {item.quantity} x{" "}
                        {item.product.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Typography>
                      <Typography fontWeight={600}>
                        {(item.quantity * item.product.price).toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "USD",
                          }
                        )}
                      </Typography>
                    </div>
                  </div>
                  <hr
                    style={{
                      margin: "0.5rem auto",
                    }}
                  />
                </>
              );
            })}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem 2rem",
              }}
            >
              <Typography fontWeight={600}>Total value</Typography>
              <Typography variant="h6" fontWeight={600}>
                {order.totalValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
            </div>
          </div>
        );
      })}
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
