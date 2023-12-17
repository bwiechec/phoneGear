import PagesList from "../components/productsList/productsList";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const subcategoryId = searchParams.subcategoryId ?? "";
  const categoryId = searchParams.categoryId ?? "1";
  return <PagesList categoryId={categoryId} subcategoryId={subcategoryId} />;
}
