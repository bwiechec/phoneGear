"use client";

import React, { Dispatch, SetStateAction } from "react";
import { ICategory, ICategoryApi } from "@/app/lib/types/types";
import {
  Alert,
  AlertColor,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./NewCategoryForm.module.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { GearSelect } from "../GearSelect/GearSelect";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface INewcategoryForm {
  categories: ICategory[];
}

export default function NewCategoryForm({ categories }: INewcategoryForm) {
  const { register, handleSubmit, control, getValues, watch, reset } =
    useForm<ICategoryApi>();
  const [snackbarProps, setSnackbarProps] = useState<{
    snackbarOpen: boolean;
    proceedMessage: string;
    alertSeverity: AlertColor;
  }>({ snackbarOpen: false, proceedMessage: "", alertSeverity: "success" });
  const router = useRouter();

  const onSubmit: SubmitHandler<ICategoryApi> = (data) => {
    console.log(data);
    axios(
      `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/categories.json`,
      { method: "POST", data: JSON.stringify(data) }
    )
      .then((res) => {
        router.refresh();
        setSnackbarProps({
          snackbarOpen: true,
          proceedMessage: "category successfully added",
          alertSeverity: "success",
        });
        setTimeout(() => {
          setSnackbarProps({ ...snackbarProps, snackbarOpen: false });
          reset();
        }, 1000);
      })
      .catch((e) => {
        handleApiError();
      });
  };

  const handleApiError = () => {
    setSnackbarProps({
      snackbarOpen: true,
      proceedMessage: "Error",
      alertSeverity: "error",
    });

    setTimeout(() => {
      setSnackbarProps({ ...snackbarProps, snackbarOpen: false });
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.new_category_form}
    >
      <FormControl key={"name"} aria-labelledby="name">
        <label htmlFor="name">Category name</label>
        <input id="name" {...register("name", { required: true })} />
      </FormControl>

      <FormControl key={"category"}>
        <label htmlFor="category">Category</label>
        <Controller
          name={"parent"}
          rules={{
            required: true,
          }}
          defaultValue={categories[0].id}
          render={({ field }) => (
            <Select
              id="category"
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

      <FormControl key={"Add"}>
        <input
          type="submit"
          value="Add subcategory"
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
