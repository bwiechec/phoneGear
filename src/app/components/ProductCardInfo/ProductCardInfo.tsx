"use client";

import { useProduct } from "@/app/context/ProductContext";
import { Error } from "@mui/icons-material";
import { NumberInput } from "../NumberInput/NumberInput";
import { GearButton } from "../GearButton/GearButton";
import styles from "./ProductCardInfo.module.css";
import { useState } from "react";
import { useBasket } from "@/app/context/BasketContext";

export default function ProductCardInfo() {
  const product = useProduct();
  const { basket, setBasket } = useBasket();
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (_event: any, value: number | undefined) => {
    setQuantity(value ?? 0);
  };

  if (!product) return <Error />;

  const handleAddToCard = () => {
    const newBasket = basket.length
      ? basket.map((b) => {
          if (b.product.id === product.id)
            return {
              product,
              quantity,
            };
          else return b;
        })
      : [{ product, quantity }];

    setBasket(newBasket);
  };

  return (
    <div className={styles.product_info}>
      <h4>{product.name}</h4>
      <p className={styles.product_info_price}>
        {product.price.toLocaleString("en-US", {
          style: "currency",
          currency: product.currency,
        })}
      </p>
      <div className={styles.product_info_actions}>
        <NumberInput
          aria-label="Quantity Input"
          min={1}
          max={99}
          value={quantity}
          onChange={handleQuantity}
        />
        <GearButton onClick={handleAddToCard}>Add to card</GearButton>
      </div>
    </div>
  );
}
