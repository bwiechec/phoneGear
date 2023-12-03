import Image from "next/image";
import styles from "./productContainer.module.css";

interface IProductContainer {
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
    <div className={styles.product_container + " container"} key={name}>
      <Image
        loading="lazy"
        src={imageUrl}
        alt={name}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP89OpTPQAI8wNPG2YGcgAAAABJRU5ErkJggg=="
        // priority
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
    </div>
  );
}
