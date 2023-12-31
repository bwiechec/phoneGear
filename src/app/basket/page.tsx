import { redirect } from "next/navigation";
import BasketList from "../components/BasketList/BasketList";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const validPhases = [undefined, "delivery", "confirm"];
  const phase = searchParams?.phase;

  if (!validPhases.includes(phase)) redirect("/");
  if (phase === undefined) return <BasketList />;
  if (phase === "delivery") return <BasketList />;
  if (phase === "confirm") return <BasketList />;
}
