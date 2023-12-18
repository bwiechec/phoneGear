import Image from "next/image";
import styles from "./productContainer.module.css";
import Link from "next/link";

interface IProductContainer {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isBestseller: boolean;
  isNew: boolean;
  category: string;
  currency: string;
}

export default function ProductContainer({
  id,
  name,
  price,
  description,
  imageUrl,
  isBestseller,
  isNew,
  category,
  currency,
}: IProductContainer) {
  return (
    <Link
      className={styles.product_container + " container"}
      key={name}
      href={`/product/${id}`}
    >
      <Image
        loading="lazy"
        src={imageUrl}
        alt={name}
        width={532}
        height={582}
        style={{ height: "auto" }}
      />
      <h5>{name}</h5>
      <p>
        {price.toLocaleString("en-US", {
          style: "currency",
          currency: currency,
        })}
      </p>
    </Link>
  );
}
