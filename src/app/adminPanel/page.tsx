import { Typography } from "@mui/material";
import NewProductForm from "../components/NewProductForm/NewProductForm";
import { ICategoryObject } from "../lib/types/types";
import styles from "./page.module.css";
import axios from "axios";
import NewCategoryForm from "../components/NewCategoryForm/NewCategoryForm";
import { useState } from "react";

export default async function Page() {
  const mainCategories = await getMainCategoryData();
  return (
    <div className={styles.container}>
      <div className={styles.add_item}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Add new product
        </Typography>
        <NewProductForm categories={mainCategories} />
      </div>

      <div className={styles.add_item}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Add new category
        </Typography>
        <NewCategoryForm categories={mainCategories} />
      </div>
    </div>
  );
}

const getMainCategoryData = async () => {
  const res = await axios<ICategoryObject>(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/categories.json?orderBy="parent"&equalTo="0"`
  );
  const data: ICategoryObject = res.data;
  let categories = [];
  for (const key in data) {
    categories.push({
      id: key,
      name: data[key].name,
      parent: data[key].parent,
    });
  }

  categories.sort((a, b) => (a.name > b.name ? 1 : -1));

  return categories;
};
