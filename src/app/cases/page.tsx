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

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const categoryId = "1";
  return <PagesList categoryId={categoryId} />;
}

export const dynamic = "force-dynamic";

// export async function generateStaticParams() {
//   return [
//     {
//       subcategoryId: "",
//     },
//   ];
// }
