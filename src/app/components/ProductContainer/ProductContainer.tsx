import Image from "next/image";
import styles from "./ProductContainer.module.css";
import Link from "next/link";
import { IProduct } from "@/app/lib/types/types";

interface IProductContainer {
  product: IProduct;
}

export default function ProductContainer({ product }: IProductContainer) {
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
    <Link
      className={styles.product_container + " container"}
      key={product.name}
      href={`/product/${product.id}`}
    >
      {isValidUrl(product.imageUrl) && (
        <Image
          loading="lazy"
          src={product.imageUrl}
          alt={product.name}
          width={532}
          placeholder="blur"
          blurDataURL="/public/phoneGear.png"
          height={582}
          style={{ height: "auto" }}
        />
      )}
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
