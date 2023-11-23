import Link from "next/link";
import ProductContainer from "../productContainer/productContainer";
import styles from "./productsList.module.css";

interface IProducts {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isBestseller: boolean;
  isNew: boolean;
  category: string;
  currency: string;
}

interface ICategory {
  id: string;
  name: string;
  parent: number;
}

interface IProductsData {
  products: Array<IProducts>;
  categories: Array<ICategory>;
  currentCategory: ICategory | null;
  subcategoryId: string;
  categoryId: string;
}

const pages = {
  ["1" as string]: "cases",
  ["2" as string]: "adapters",
  ["3" as string]: "cables",
};

const ProductsList = ({
  products,
  categories,
  currentCategory,
  subcategoryId,
  categoryId,
}: IProductsData) => {
  console.log(products.length);
  return (
    <main className={styles.product_list}>
      <div className={styles.product_list_categories}>
        <h4>Categories</h4>
        <Link
          href={pages[categoryId]}
          className={!subcategoryId ? styles.current_subcategory : ""}
        >
          {currentCategory && currentCategory.name}
        </Link>
        <ul className={styles.product_list_categories_list}>
          {categories.map((category) => {
            return (
              <li
                className={
                  subcategoryId && category.id === subcategoryId
                    ? styles.current_subcategory
                    : ""
                }
              >
                <Link href={"/cases?subcategoryId=" + category.id}>
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.product_list_products}>
        {!products.length && <div>test</div>}

        {products.map((product) => {
          return (
            <ProductContainer
              name={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
              isBestseller={product.isBestseller}
              isNew={product.isNew}
              category={product.category}
              currency={product.currency}
            />
          );
        })}
      </div>
    </main>
  );
};

export default ProductsList;
