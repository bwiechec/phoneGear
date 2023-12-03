import ProductsList from "../components/productsList/productsList";
import { Suspense } from "react";
import Loading from "../components/loading/Loading";

export default async function Page() {
  const categoryId = "1";
  return <ProductsList categoryId={categoryId} />;
}
