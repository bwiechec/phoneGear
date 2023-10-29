import styles from "./productContainer.module.css";

interface IProductContainer {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  isBestseller: boolean;
  isNew: boolean;
  category: string;
}

export default function ProductContainer({
  name,
  price,
  description,
  imageUrl,
  isBestseller,
  isNew,
  category,
}: IProductContainer) {
  return (
    <div className={styles.product_container}>
      <h3>{name}</h3>
      <img src={imageUrl} alt={name} />
      <h4>{description}</h4>
      <p>{price}</p>
    </div>
  );
}
