import Image from "next/image";
import styles from "./ProductContainer.module.css";
import Link from "next/link";
import { IProduct } from "@/app/lib/types/product";

interface IProductContainer {
  product: IProduct;
}

export default function ProductContainer({ product }: IProductContainer) {
  return (
    <Link
      className={styles.product_container + " container"}
      key={product.name}
      href={`/product/${product.id}`}
    >
      <Image
        loading="lazy"
        src={product.imageUrl}
        alt={product.name}
        width={532}
        height={582}
        style={{ height: "auto" }}
      />
      <h5>{product.name}</h5>
      <p>
        {product.price.toLocaleString("en-US", {
          style: "currency",
          currency: product.currency,
        })}
      </p>
    </Link>
  );
}
