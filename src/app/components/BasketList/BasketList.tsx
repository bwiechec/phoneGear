"use client";

import { useBasket } from "@/app/context/BasketContext";
import BasketItem from "../BasketItem/BasketItem";
import { IProducts } from "@/app/lib/types/product";
import styles from "./BasketList.module.css";
import Button from "@mui/material/Button";
import { it } from "node:test";

export default function BasketList() {
  const { basket, setBasket } = useBasket();

  const handleQuantityChange = (
    value: number | undefined,
    product: IProducts
  ) => {
    let newBasket = [...basket];
    let inBasket = newBasket.findIndex((b) => b.product.id === product.id);

    newBasket[inBasket].quantity = value ?? 0;

    console.log(`value: ${value}`);

    // console.log(newBasket);
    setBasket(newBasket);
  };

  let basketSummary = 0;
  basket.forEach((item) => {
    basketSummary += item.product.price * item.quantity;
  });

  return (
    <div className={styles.basket}>
      {basket?.length ? (
        <>
          <div className={styles.basket_list}>
            {basket.map((basketItem) => {
              return (
                <BasketItem
                  key={basketItem.product.id}
                  basketItem={basketItem}
                  handleQuantityChange={handleQuantityChange}
                />
              );
            })}
          </div>
          <div className={styles.basket_summary}>
            SUMMARY
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <span>Item value:</span>{" "}
              <span>
                {basketSummary.toLocaleString("en-US", {
                  style: "currency",
                  currency: basket[0]?.product.currency ?? "USD",
                })}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <span>Delivery value:</span> <span>${123}</span>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <span>Total value:</span> <span>${123}</span>
            </div>
            <Button className={styles.basket_summary_proceed}>Proceed</Button>
          </div>
        </>
      ) : (
        <div>No products in basket</div>
      )}
    </div>
  );
}
