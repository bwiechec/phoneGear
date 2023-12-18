import Link from "next/link";
import ProductContainer from "../ProductContainer/ProductContainer";
import styles from "./productsList.module.css";

interface IProductsData {
  products: Array<IProducts>;
  categories: Array<ICategory>;
  currentCategory: ICategory | null;
}

interface IProductsObject {
  [key: string]: IProductsApi;
}

interface ICategoryObject {
  [key: string]: ICategory;
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

interface ICategory {
  id: string;
  name: string;
  parent: number;
}

interface IProductsList {
  categoryId: string;
  subcategoryId: string;
}

const pages = {
  ["1" as string]: "cases",
  ["2" as string]: "adapters",
  ["3" as string]: "cables",
};

const ProductsList = async ({ categoryId, subcategoryId }: IProductsList) => {
  const { products, categories, currentCategory }: IProductsData =
    await getData({ categoryId, subcategoryId });
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
                key={category.id}
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
              id={product.id}
              key={product.name}
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

const getProductData = async (
  categoryId: string,
  subcategoryId: string | null
) => {
  const url = new URL(
    "https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/products.json"
  );
  if (subcategoryId) {
    url.searchParams.append("orderBy", '"subcategory"');
    url.searchParams.append("equalTo", `"${subcategoryId}"`);
  }
  url.searchParams.append("orderBy", '"category"');
  url.searchParams.append("equalTo", `"${categoryId}"`);

  const res = await fetch(url.toString());
  const data: IProductsObject = await res.json();
  let products = [];
  for (const key in data) {
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
    });
  }

  return products;
};

const getCategoryData = async (categoryId: string) => {
  const res = await fetch(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/categories.json?orderBy="parent"&equalTo="${categoryId}"`
  );
  const data: ICategoryObject = await res.json();
  let products = [];
  for (const key in data) {
    products.push({
      id: key,
      name: data[key].name,
      parent: data[key].parent,
    });
  }

  products.sort((a, b) => (a.name > b.name ? 1 : -1));

  return products;
};

const getCurrentCategoryData = async (categoryId: string) => {
  const res = await fetch(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/categories/${categoryId}.json`
  );
  const data: ICategory = await res.json();

  return data;
};

const getData = async ({ categoryId, subcategoryId }: IProductsList) => {
  const [products, categories, currentCategory]: [
    Array<IProducts>,
    Array<ICategory>,
    ICategory
  ] = await Promise.all([
    getProductData(categoryId, subcategoryId),
    getCategoryData(categoryId),
    getCurrentCategoryData(categoryId),
  ]);
  const fixedCurrentCategory = categoryId === "0" ? null : currentCategory;

  return { products, categories, currentCategory: fixedCurrentCategory };
};

export default ProductsList;