import Image from "next/image";
import styles from "./page.module.css";
import { IProduct, IProductApi } from "@/app/lib/types/types";
import { ProductContextProvider } from "@/app/context/ProductContext";
import ProductCardInfo from "@/app/components/ProductCardInfo/ProductCardInfo";
import ProductDetails from "@/app/components/ProductDetails/ProductDetails";
import SimilarProducts from "@/app/components/SimilarProducts/SimilarProducts";
import axios from "axios";

interface IPage {
  productId: string;
}

export default async function Page({ params }: { params: IPage }) {
  const product: IProduct = await getProductData(params.productId);
  const similarProducts: IProduct[] = await getSimilarProductData(
    product.subcategory,
    params.productId
  );
  const isValidUrl = (urlString: string) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };
  return (
    <ProductContextProvider value={product}>
      <div className={styles.product_card_container}>
        <div className={styles.product_card}>
          <div className={styles.product_card_image}>
            {isValidUrl(product.imageUrl) && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={532}
                height={582}
                style={{ height: "auto" }}
              />
            )}
          </div>
          <div className={styles.product_card_data}>
            <ProductCardInfo />
            <ProductDetails />
          </div>
        </div>
        <SimilarProducts similarProducts={similarProducts} />
      </div>
    </ProductContextProvider>
  );
}

const getProductData = async (productId: string) => {
  const url = new URL(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`
  );

  const res = await axios<IProductApi>(url.toString());
  const data: IProductApi = res.data;

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
    subcategory: data.subcategory,
  };
};

const getSimilarProductData = async (
  productSubcategory: string,
  productId: string
) => {
  const url = new URL(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/products.json`
  );

  url.searchParams.append("orderBy", '"subcategory"');
  url.searchParams.append("equalTo", `"${productSubcategory}"`);
  url.searchParams.append("limit", '"4"');

  const res = await axios<IProductApi[]>(url.toString());
  const data: IProductApi[] = res.data;
  let products = [];
  for (const key in data) {
    if (key !== productId)
      products.push({
        id: key,
        name: data[key].name,
        price: data[key].price,
        description: data[key].description,
        imageUrl: data[key].imageUrl,
        isBestseller: data[key].isBestseller,
        isNew: data[key].isNew,
        category: data[key].category,
        currency: data[key].currency,
        subcategory: data[key].subcategory,
      });
  }

  return products.slice(0, 4);
};
