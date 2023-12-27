"use client";

import { useBasket } from "@/app/context/BasketContext";
import BasketItem from "../BasketItem/BasketItem";
import { IProducts } from "@/app/lib/types/product";
import styles from "./BasketList.module.css";
import BasketSummary from "../BasketSummary/BasketSummary";

export default function BasketList() {
  const { basket, setBasket } = useBasket();

  const handleQuantityChange = (
    value: number | undefined,
    product: IProducts
  ) => {
    let newBasket = [...basket];
    let index = newBasket.findIndex((b) => b.product.id === product.id);

    newBasket[index].quantity = value ?? 0;

    setBasket(newBasket);
  };

  const handleItemDelete = (product: IProducts) => {
    let newBasket = [...basket];
    let index = newBasket.findIndex((b) => b.product.id === product.id);

    if (index !== -1) {
      newBasket.splice(index, 1);
    }

    setBasket(newBasket);
  };

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
                  handleItemDelete={handleItemDelete}
                />
              );
            })}
          </div>
          <BasketSummary />
        </>
      ) : (
        <div>No products in basket</div>
      )}
    </div>
  );
}
