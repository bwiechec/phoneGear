import BasketItem from "@/app/components/BasketItem/BasketItem";
import {
  IDeliveryMethod,
  IDeliveryMethodApi,
  IOrder,
  IOrderApi,
  IPaymentMethod,
  IPaymentMethodApi,
} from "@/app/lib/types/types";
import styles from "./page.module.css";
import OrderCard from "@/app/components/OrderCard/OrderCard";
import { Typography } from "@mui/material";
import { useSettings } from "@/app/context/SettingsContext";
import { OrderDetails } from "@/app/components/OrderDetails/OrderDetails";

interface IPage {
  orderId: string;
}

export default async function Page({ params }: { params: IPage }) {
  const { paymentMethods, deliveryMethods, orderData } = await getData(
    params.orderId
  );

  return (
    <div className={styles.order}>
      <OrderCard order={orderData} />
      <OrderDetails
        orderData={orderData}
        paymentMethods={paymentMethods}
        deliveryMethods={deliveryMethods}
      />
    </div>
  );
}

const getOrderData = async (orderId: string) => {
  const res = await fetch(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/order/${orderId}.json`,
    { cache: "no-store" }
  );
  const data: IOrderApi = await res.json();

  return { id: orderId, ...data };
};

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

const getData = async (orderId: string) => {
  const [paymentMethods, deliveryMethods, orderData]: [
    Array<IPaymentMethod>,
    Array<IDeliveryMethod>,
    IOrder
  ] = await Promise.all([
    getPaymentMethods(),
    getDeliveryMethods(),
    getOrderData(orderId),
  ]);

  return { paymentMethods, deliveryMethods, orderData };
};
