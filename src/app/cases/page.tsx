import ProductsList from "../components/productsList/productsList";

export default async function Page() {
  const categoryId = "1";
  return <ProductsList categoryId={categoryId} />;
}
