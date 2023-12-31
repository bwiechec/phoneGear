import { IProduct } from "@/app/lib/types/types";
import styles from "./SimilarProducts.module.css";
import { Typography } from "@mui/material";
import ProductContainer from "../ProductContainer/ProductContainer";

interface ISimilarProducts {
  similarProducts: IProduct[];
}

export default function SimilarProducts({ similarProducts }: ISimilarProducts) {
  if (!similarProducts.length) return null;
  return (
    <div className={styles.similar_products}>
      <Typography variant="h5" fontWeight={600} mb={2} ml={2}>
        Similar products
      </Typography>
      <div className={styles.similar_products_list}>
        {similarProducts.length &&
          similarProducts.map((product) => {
            return <ProductContainer product={product} key={product.id} />;
          })}
      </div>
    </div>
  );
}
