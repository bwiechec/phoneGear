"use client";

import Link from "next/link";
import ProductContainer from "../ProductContainer/ProductContainer";
import styles from "./ProductListCategories.module.css";
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
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface IProductListCategories {
  categoryId: string;
  subcategoryId: string;
  currentCategory: ICategory | null;
  categories: ICategory[];
}

export default function ProductListCategories({
  categoryId,
  subcategoryId,
  currentCategory,
  categories,
}: IProductListCategories) {
  const showCategories = () => {
    const categories = document.getElementsByClassName(
      styles.product_list_categories
    )[0];
    categories.classList.contains(styles.product_list_categories_show)
      ? categories.classList.remove(styles.product_list_categories_show)
      : categories.classList.add(styles.product_list_categories_show);

    const overlay = document.getElementsByClassName(
      styles.product_list_categories_overlay
    )[0];
    overlay.classList.contains(styles.product_list_categories_overlay_show)
      ? overlay.classList.remove(styles.product_list_categories_overlay_show)
      : overlay.classList.add(styles.product_list_categories_overlay_show);
  };
  return (
    <>
      <div
        className={styles.product_list_categories_overlay}
        onClick={showCategories}
      ></div>
      <div
        className={styles.product_list_show_categories}
        onClick={showCategories}
      >
        <FilterListOutlinedIcon />
      </div>
      <div className={styles.product_list_categories}>
        <h4 className={styles.product_list_categories_text}>
          Categories
          <CloseOutlinedIcon
            onClick={showCategories}
            className={styles.product_list_categories_close}
          />
        </h4>
        <Link
          href={categoryId}
          className={!subcategoryId ? styles.current_subcategory : ""}
          onClick={showCategories}
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
                <Link
                  href={"/cases?subcategoryId=" + category.id}
                  onClick={showCategories}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
