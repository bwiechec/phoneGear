import Link from "next/link";
import ProductContainer from "../ProductContainer/ProductContainer";
import styles from "./ProductsList.module.css";
import { Typography } from "@mui/material";
import {
  ICategory,
  ICategoryObject,
  IProduct,
  IProductApi,
  IProductObject,
  IProductData,
} from "@/app/lib/types/types";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ProductListCategories from "../ProductListCategories/ProductListCategories";
import axios from "axios";
import { cache } from "react";

interface IProductList {
  categoryId: string;
  subcategoryId: string;
}

const pages = {
  ["1" as string]: "cases",
  ["2" as string]: "adapters",
  ["3" as string]: "cables",
};

const ProductsList = async ({ categoryId, subcategoryId }: IProductList) => {
  const { products, categories, currentCategory }: IProductData = await getData(
    {
      categoryId,
      subcategoryId,
    }
  );

  return (
    <main className={styles.product_list}>
      <ProductListCategories
        categoryId={pages[categoryId]}
        subcategoryId={subcategoryId}
        currentCategory={currentCategory}
        categories={categories}
      />
      <div className={styles.product_list_products}>
        {!products.length && (
          <Typography textAlign={"center"} width={"100%"}>
            No products in this category!
          </Typography>
        )}

        {products.map((product) => {
          return <ProductContainer product={product} key={product.id} />;
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

  const res = await axios<IProductObject>(url.toString());
  const data: IProductObject = res.data;
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
      subcategory: data[key].subcategory,
    });
  }

  return products;
};

const getCategoryData = async (categoryId: string) => {
  const res = await axios<ICategoryObject>(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/categories.json?orderBy="parent"&equalTo="${categoryId}"`
  );
  const data: ICategoryObject = res.data;
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
  const res = await axios<ICategory>(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/categories/${categoryId}.json`
  );
  const data: ICategory = res.data;

  return data;
};

const getData = async ({ categoryId, subcategoryId }: IProductList) => {
  const [products, categories, currentCategory]: [
    Array<IProduct>,
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

export const dynamic = "force-dynamic";
