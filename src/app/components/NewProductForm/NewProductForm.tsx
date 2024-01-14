"use client";

import { ICategory, IProductApi } from "@/app/lib/types/types";
import { FormControl } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./NewProductForm.module.css";

interface INewProductForm {
  categories: ICategory[];
}

export default function NewProductForm({ categories }: INewProductForm) {
  const { register, handleSubmit } = useForm<IProductApi>();
  const onSubmit: SubmitHandler<IProductApi> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.new_product_form}>
      <FormControl key={"name"}>
        <label>Product Name</label>
        <input {...register("name", { required: true })} />
      </FormControl>

      <FormControl key={"price"}>
        <label>Price</label>
        <input {...register("price", { required: true })} />
      </FormControl>

      <FormControl key={"description"}>
        <label>Description</label>
        <input {...register("description", { required: true })} />
      </FormControl>

      <FormControl key={"imageUrl"}>
        <label>Image url</label>
        <input {...register("imageUrl", { required: true })} />
      </FormControl>

      <FormControl key={"category"}>
        <label>Category</label>
        <select {...register("category", { required: true })}>
          {categories.map((category) => {
            return <option value={category.id}>{category.name}</option>;
          })}
        </select>
      </FormControl>

      <FormControl key={"currency"}>
        <label>Currency</label>
        <select {...register("currency", { required: true })}>
          <option>USD</option>
        </select>
      </FormControl>

      <FormControl key={"subcategory"}>
        <label>Subcategory</label>
        <input {...register("subcategory", { required: true })} />
      </FormControl>
      <input type="submit" value="Add" />
    </form>
  );
}
