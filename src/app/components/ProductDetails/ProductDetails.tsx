"use client";

import { useProduct } from "@/app/context/ProductContext";
import styles from "./ProductDetails.module.css";
import { Error } from "@mui/icons-material";

export default function ProductDetails() {
  const product = useProduct();

  if (!product) return <Error />;

  return (
    <div className={styles.product_details}>
      <p>{product.description}</p>
    </div>
  );
}
