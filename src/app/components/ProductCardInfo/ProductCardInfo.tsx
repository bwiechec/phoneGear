"use client";

import { useProduct } from "@/app/context/ProductContext";
import { Error } from "@mui/icons-material";
import { NumberInput } from "../NumberInput/NumberInput";
import { GearButton } from "../GearButton/GearButton";
import styles from "./ProductCardInfo.module.css";
import { useState } from "react";
import { useBasket } from "@/app/context/BasketContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import GearModal from "../GearModal/GearModal";
import { Popover, Popper, Typography } from "@mui/material";

export default function ProductCardInfo() {
  const product = useProduct();
  const { basket, setBasket } = useBasket();
  const [quantity, setQuantity] = useState(1);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleQuantity = (_event: any, value: number | undefined) => {
    setQuantity(value ?? 0);
  };

  if (!product) return <Error />;

  const handleAddToCard = () => {
    let newBasket = [...basket];
    let inBasket = newBasket.findIndex((b) => b.product.id === product.id);

    if (inBasket < 0)
      newBasket.push({
        product,
        quantity,
      });
    else newBasket[inBasket].quantity = quantity + newBasket[inBasket].quantity;

    setBasket(newBasket);
    setAnchorEl(document.querySelector(".menu_basket_button"));

    setTimeout(() => {
      setAnchorEl(null);
    }, 1500);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const totalQuantity =
    basket.find((b) => b.product.id === product.id)?.quantity ?? 0;

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
        <Popper
          id={id}
          className={styles.product_info_actions_popper}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          // anchorOrigin={{
          //   vertical: "bottom",
          //   horizontal: "right",
          // }}
          // transformOrigin={{
          //   vertical: "top",
          //   horizontal: "right",
          // }}
        >
          <Typography textAlign={"center"} sx={{ p: 2 }}>
            Added {product.name} to card.
          </Typography>
          <Typography textAlign={"center"} sx={{ p: 2, pt: 0 }}>
            Total quantity: {totalQuantity}
          </Typography>
        </Popper>
      </div>
    </div>
  );
}
