import PagesList from "../components/productsList/productsList";

interface IProducts {
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

interface IProductsData {
  products: Array<IProducts>;
  categories: Array<ICategory>;
  currentCategory: ICategory | null;
}

interface IProductsObject {
  [key: string]: IProducts;
}

interface ICategoryObject {
  [key: string]: ICategory;
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const categoryId = "3";
  return <PagesList categoryId={categoryId} />;
}
export const dynamic = "force-dynamic";
