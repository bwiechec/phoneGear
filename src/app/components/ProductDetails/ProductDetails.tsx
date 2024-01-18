"use client";

import { useProduct } from "@/app/context/ProductContext";
import styles from "./ProductDetails.module.css";
import { Error } from "@mui/icons-material";
import { Typography } from "@mui/material";

export default function ProductDetails() {
  const product = useProduct();

  if (!product) return <Error />;

  return (
    <div className={styles.product_details}>
      <Typography style={{ whiteSpace: "pre-line" }}>
        {product.description}
      </Typography>
    </div>
  );
}
