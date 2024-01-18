import { IDeliveryMethod, IPaymentMethod } from "@/app/lib/types/types";
import styles from "./DeliveryMethodList.module.css";
import InputLabel from "@mui/material/InputLabel";
import { GearSelect } from "../GearSelect/GearSelect";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useBasket } from "@/app/context/BasketContext";
import { useSettings } from "@/app/context/SettingsContext";

interface IDeliveryMethodList {
  deliveryMethods: IDeliveryMethod[];
  selectedPayment: IPaymentMethod;
  selectedDelivery: IDeliveryMethod;
  basketSummary: number;
}

export default function DeliveryMethodList({
  deliveryMethods,
  selectedPayment,
  selectedDelivery,
  basketSummary,
}: IDeliveryMethodList) {
  const { basket, setBasket } = useBasket();
  const settings = useSettings();
  return (
    <>
      <InputLabel
        variant="filled"
        id="delivery-select-label"
        htmlFor="delivery-select"
        sx={{
          color: "var(--text)",
        }}
      >
        Delivery method
      </InputLabel>
      <GearSelect
        labelId="delivery-select-label"
        id="delivery-select"
        value={selectedDelivery.id}
      >
        {deliveryMethods.map((method) => {
          return (
            <MenuItem value={method.id} key={method.id}>
              <Link
                scroll={false}
                href={`?${new URLSearchParams({
                  payment: selectedPayment.id,
                  delivery: method.id,
                })}`}
                style={{ width: "100%" }}
              >
                {method.name} (
                {(basketSummary >= settings.free_delivery
                  ? 0
                  : method.price
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: basket[0]?.product.currency ?? "USD",
                })}
                )
              </Link>
            </MenuItem>
          );
        })}
      </GearSelect>
    </>
  );
}
