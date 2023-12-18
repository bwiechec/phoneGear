import Image from "next/image";
import styles from "./page.module.css";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import { NumberInput } from "@/app/components/NumberInput/NumberInput";
import Button from "@mui/material/Button";
import { GearButton } from "@/app/components/GearButton/GearButton";

interface IPage {
  productId: string;
}

interface IProductsApi {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isBestseller: boolean;
  isNew: boolean;
  category: string;
  currency: string;
}

interface IProducts {
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

export default async function Page({ params }: { params: IPage }) {
  const product: IProducts = await getProductData(params.productId);
  return (
    <div className={styles.product_card}>
      <div className={styles.product_card_image}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={532}
          height={582}
          style={{ height: "auto" }}
        />
      </div>
      <div className={styles.product_card_info}>
        <h4>{product.name}</h4>
        <p>
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: product.currency,
          })}
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          <NumberInput aria-label="Quantity Input" min={1} max={99} value={1} />
          <GearButton>Add to card</GearButton>
        </div>
        <p>{product.description}</p>
        <ProductDetails />
      </div>
    </div>
  );
}
const getProductData = async (productId: string) => {
  const url = new URL(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`
  );

  const res = await fetch(url.toString());
  const data: IProductsApi = await res.json();

  return {
    id: productId,
    name: data.name,
    price: data.price,
    description: data.description,
    imageUrl: data.imageUrl,
    isBestseller: data.isBestseller,
    isNew: data.isNew,
    category: data.category,
    currency: data.currency,
  };
};
