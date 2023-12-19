"use client";

import { useBasket } from "../context/BasketContext";

export default async function Page() {
  const { basket, setBasket } = useBasket();
  console.log(basket);
  return <div></div>;
}
