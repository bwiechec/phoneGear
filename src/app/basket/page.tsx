import BasketItem from "../components/BasketItem/BasketItem";
import BasketList from "../components/BasketList/BasketList";
import { useBasket } from "../context/BasketContext";
import { IProducts } from "../lib/types/product";

export default async function Page() {
  return <BasketList />;
}
