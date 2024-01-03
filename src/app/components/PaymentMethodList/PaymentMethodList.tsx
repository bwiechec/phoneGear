import { IDeliveryMethod, IPaymentMethod } from "@/app/lib/types/types";
import styles from "./PaymentMethodList.module.css";
import InputLabel from "@mui/material/InputLabel";
import { GearSelect } from "../GearSelect/GearSelect";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

interface IPaymentMethodList {
  paymentMethods: IPaymentMethod[];
  selectedPayment: IPaymentMethod;
  selectedDelivery: IDeliveryMethod;
}

export default function PaymentMethodList({
  paymentMethods,
  selectedPayment,
  selectedDelivery,
}: IPaymentMethodList) {
  return (
    <>
      <InputLabel
        variant="filled"
        id="payment-select-label"
        htmlFor="payment-select"
        sx={{ color: "var(--text)" }}
      >
        Payment method
      </InputLabel>
      <GearSelect
        labelId="paymente-select-label"
        id="payment-select"
        value={selectedPayment.id}
      >
        {paymentMethods.map((method) => {
          return (
            <MenuItem value={method.id} key={method.id}>
              <Link
                href={`?${new URLSearchParams({
                  payment: method.id,
                  delivery: selectedDelivery.id,
                })}`}
                style={{ width: "100%" }}
              >
                {method.name} (fee: {method.fee}%)
              </Link>
            </MenuItem>
          );
        })}
      </GearSelect>
    </>
  );
}
