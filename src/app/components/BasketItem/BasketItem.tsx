"use client";

import { IBasket, IProduct } from "@/app/lib/types/types";
import { NumberInput } from "../NumberInput/NumberInput";
import { useEffect, useState } from "react";
import styles from "./BasketItem.module.css";
import Image from "next/image";
import { Button } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface IBasketItem {
  basketItem: IBasket;
  handleQuantityChange?: (value: number | undefined, product: IProduct) => void;
  handleItemDelete?: (product: IProduct) => void;
}

export default function BasketItem({
  basketItem,
  handleQuantityChange,
  handleItemDelete,
}: IBasketItem) {
  const [quantity, setQuantity] = useState(basketItem.quantity);

  useEffect(() => {
    setQuantity(basketItem.quantity);
  }, [basketItem.quantity]);

  const handleQuantity = (_event: any, value: number | undefined) => {
    handleQuantityChange && handleQuantityChange(value, basketItem.product);
  };

  return (
    <div className={styles.basket_item}>
      <Image
        loading="lazy"
        src={basketItem.product.imageUrl}
        alt={basketItem.product.name}
        width={200}
        height={200}
        style={{ height: "auto" }}
      />
      <h5 className={styles.basket_item_name}>{basketItem.product.name}</h5>
      <div className={styles.basket_item_quantity}>
        {handleQuantityChange ? (
          <NumberInput
            aria-label="Quantity Input"
            min={1}
            max={99}
            value={quantity}
            onChange={handleQuantity}
            style={{ height: "fit-content" }}
          />
        ) : (
          <h5>{quantity}x</h5>
        )}
        <h5>
          {(quantity * basketItem.product.price).toLocaleString("en-US", {
            style: "currency",
            currency: basketItem.product.currency,
          })}{" "}
        </h5>
      </div>
      {handleItemDelete && (
        <Button
          className={styles.basket_item_delete}
          onClick={() => handleItemDelete(basketItem.product)}
          name="delete"
          aria-label="delete"
        >
          <DeleteOutlinedIcon />
        </Button>
      )}
    </div>
  );
}
