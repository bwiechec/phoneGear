import Image from "next/image";
import styles from "./page.module.css";
import { IProducts, IProductsApi } from "@/app/lib/types/product";
import { ProductContextProvider } from "@/app/context/ProductContext";
import ProductCardInfo from "@/app/components/ProductCardInfo/ProductCardInfo";
import ProductDetails from "@/app/components/ProductDetails/ProductDetails";

interface IPage {
  productId: string;
}

export default async function Page({ params }: { params: IPage }) {
  const product: IProducts = await getProductData(params.productId);
  return (
    <ProductContextProvider value={product}>
      <div className={styles.product_card_container}>
        <div className={styles.product_card_image}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={532}
            height={582}
            style={{ height: "auto" }}
          />
        </div>
        <div className={styles.product_card}>
          <ProductCardInfo />
          <ProductDetails />
        </div>
      </div>
    </ProductContextProvider>
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
