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
  const { products, categories, currentCategory }: IProductsData =
    await getData(searchParams);
  const subcategoryId = searchParams.subcategoryId ?? "";
  const categoryId = searchParams.categoryId ?? "3";
  return (
    <PagesList
      products={products}
      categories={categories}
      currentCategory={currentCategory}
      subcategoryId={subcategoryId}
      categoryId={categoryId}
    />
  );
}

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

  const res = await fetch(url.toString());
  const data: IProductsObject = await res.json();
  let products = [];
  for (const key in data) {
    products.push({
      name: data[key].name,
      price: data[key].price,
      description: data[key].description,
      imageUrl: data[key].imageUrl,
      isBestseller: data[key].isBestseller,
      isNew: data[key].isNew,
      category: data[key].category,
      currency: data[key].currency,
    });
  }

  return products;
};

const getCategoryData = async (categoryId: string) => {
  const res = await fetch(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/categories.json?orderBy="parent"&equalTo="${categoryId}"`
  );
  const data: ICategoryObject = await res.json();
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
  const res = await fetch(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/categories/${categoryId}.json`
  );
  const data: ICategory = await res.json();

  return data;
};

const getData = async (searchParams: { [key: string]: string | undefined }) => {
  const categoryId = searchParams.categoryId ?? "3";
  const subcategoryId = searchParams.subcategoryId ?? null;
  const [products, categories, currentCategory]: [
    Array<IProducts>,
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

// export const dynamic = "force-dynamic";
export const generateStaticParams = () => [];
