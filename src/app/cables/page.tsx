import ProductsList from "../components/productsList/productsList";

export default async function Page() {
  const categoryId = "3";
  return <ProductsList categoryId={categoryId} />;
}
