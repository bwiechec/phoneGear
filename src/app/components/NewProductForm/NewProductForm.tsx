"use client";

import { ICategory, IProductApi } from "@/app/lib/types/types";
import {
  Alert,
  AlertColor,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./NewProductForm.module.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { GearSelect } from "../GearSelect/GearSelect";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface INewProductForm {
  categories: ICategory[];
}

export default function NewProductForm({ categories }: INewProductForm) {
  const { register, handleSubmit, control, getValues, watch, reset } =
    useForm<IProductApi>();
  const [subcategories, setSubcategories] = useState<ICategory[] | []>([]);
  const [snackbarProps, setSnackbarProps] = useState<{
    snackbarOpen: boolean;
    proceedMessage: string;
    alertSeverity: AlertColor;
  }>({ snackbarOpen: false, proceedMessage: "", alertSeverity: "success" });
  const categoryId = getValues("category");
  const router = useRouter();

  const onSubmit: SubmitHandler<IProductApi> = (data) => {
    console.log(data);
    fetch(
      `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/products.json`,
      { method: "POST", body: JSON.stringify(data) }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Error!");
        }
      })
      .then((resJson) => {
        router.refresh();
        setSnackbarProps({
          snackbarOpen: true,
          proceedMessage: "Product successfully added",
          alertSeverity: "success",
        });
        setTimeout(() => {
          setSnackbarProps({ ...snackbarProps, snackbarOpen: false });
          reset();
        }, 1000);
      })
      .catch((e) => {
        setSnackbarProps({
          snackbarOpen: true,
          proceedMessage: "Error",
          alertSeverity: "error",
        });
        setTimeout(() => {
          setSnackbarProps({ ...snackbarProps, snackbarOpen: false });
        }, 1000);
      });
  };

  watch("category");

  const getSubcateogyData = () => {
    fetch(
      `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/categories.json?orderBy="parent"&equalTo="${categoryId}"`
    )
      .then((res) => res.json())
      .then((resJson) => {
        let categories = [];
        for (const key in resJson) {
          categories.push({
            id: key,
            name: resJson[key].name,
            parent: resJson[key].parent,
          });
        }

        categories.sort((a, b) => (a.name > b.name ? 1 : -1));

        setSubcategories(categories);
      });
    setSubcategories([]);
  };

  useEffect(() => {
    getSubcateogyData();
  }, [categoryId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.new_product_form}>
      <FormControl key={"name"}>
        <label>Product Name</label>
        <input {...register("name", { required: true })} />
      </FormControl>

      <FormControl key={"price"}>
        <label>Price</label>
        <input
          type="number"
          step={0.01}
          {...register("price", { required: true, valueAsNumber: true })}
        />
      </FormControl>

      <FormControl key={"description"}>
        <label>Description</label>
        <textarea {...register("description", { required: true })} />
      </FormControl>

      <FormControl key={"imageUrl"}>
        <label>Image url</label>
        <input {...register("imageUrl", { required: true })} />
      </FormControl>

      <FormControl key={"category"}>
        <label>Category</label>
        <Controller
          name={"category"}
          rules={{
            required: true,
          }}
          defaultValue={categories[0].id}
          render={({ field }) => (
            <Select
              sx={{
                color: "var(--accent)",
                fontWeight: "600",
                width: "15rem",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--accent)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--text)",
                },
              }}
              {...field}
            >
              {categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
          control={control}
        />
      </FormControl>

      <FormControl key={"currency"}>
        <label>Currency</label>
        <Controller
          name={"currency"}
          rules={{
            required: true,
          }}
          defaultValue="USD"
          render={({ field }) => (
            <Select
              sx={{
                color: "var(--accent)",
                fontWeight: "600",
                width: "15rem",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--accent)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--text)",
                },
              }}
              {...field}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
          )}
          control={control}
        />
      </FormControl>

      <FormControl key={"subcategory"}>
        <label>Subcategory</label>

        <Controller
          name={"subcategory"}
          rules={{
            required: true,
          }}
          defaultValue={subcategories[0]?.id ?? ""}
          render={({ field }) => (
            <Select
              sx={{
                color: "var(--accent)",
                fontWeight: "600",
                width: "15rem",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--accent)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--text)",
                },
              }}
              {...field}
            >
              {subcategories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
          control={control}
        />
      </FormControl>

      <FormControl key={"Add"}>
        <input
          type="submit"
          value="Add product"
          className={styles.accent_button}
        />
      </FormControl>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarProps.snackbarOpen}
      >
        <Alert severity={snackbarProps.alertSeverity}>
          {snackbarProps.proceedMessage}
        </Alert>
      </Snackbar>
    </form>
  );
}
