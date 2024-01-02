import { redirect } from "next/navigation";
import BasketList from "../components/BasketList/BasketList";
import {
  IDeliveryMethodApi,
  IPaymentMethodApi,
  IDeliveryMethod,
  IPaymentMethod,
} from "../lib/types/types";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { paymentMethods, deliveryMethods } = await getData();
  return (
    <BasketList
      paymentMethods={paymentMethods}
      deliveryMethods={deliveryMethods}
    />
  );
}

const getPaymentMethods = async () => {
  const res = await fetch(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/payment_methods.json`
  );
  const data: IPaymentMethodApi[] = await res.json();
  let methods = [];
  for (const key in data) {
    methods.push({
      id: key,
      name: data[key].name,
      fee: data[key].fee,
    });
  }

  return methods;
};

const getDeliveryMethods = async () => {
  const res = await fetch(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/delivery_methods.json`
  );
  const data: IDeliveryMethodApi[] = await res.json();
  let methods = [];
  for (const key in data) {
    methods.push({
      id: key,
      name: data[key].name,
      price: data[key].price,
    });
  }

  return methods;
};

const getData = async () => {
  const [paymentMethods, deliveryMethods]: [
    Array<IPaymentMethod>,
    Array<IDeliveryMethod>
  ] = await Promise.all([getPaymentMethods(), getDeliveryMethods()]);

  return { paymentMethods, deliveryMethods };
};
