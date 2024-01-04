"use client";
import { useBasket } from "@/app/context/BasketContext";
import { useSettings } from "@/app/context/SettingsContext";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import styles from "./BasketSummary.module.css";
import Link from "next/link";
import { IDeliveryMethod, IOrder, IPaymentMethod } from "@/app/lib/types/types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { GearSelect } from "../GearSelect/GearSelect";
import { useSearchParams } from "next/navigation";
import PaymentMethodList from "../PaymentMethodList/PaymentMethodList";
import DeliveryMethodList from "../DeliveryMethodList/DeliveryMethodList";
import { useRouter } from "next/navigation";
import { Alert, AlertColor, Snackbar } from "@mui/material";

interface IBasketSummary {
  paymentMethods: IPaymentMethod[];
  deliveryMethods: IDeliveryMethod[];
}

export default function BasketSummary({
  paymentMethods,
  deliveryMethods,
}: IBasketSummary) {
  const [snackbarProps, setSnackbarProps] = useState<{
    snackbarOpen: boolean;
    proceedMessage: string;
    alertSeverity: AlertColor;
  }>({ snackbarOpen: false, proceedMessage: "", alertSeverity: "success" });
  const { basket, setBasket } = useBasket();
  const settings = useSettings();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedPayment =
    paymentMethods.find(
      (method) => method.id === searchParams.get("payment")
    ) ?? paymentMethods[0];

  const selectedDelivery =
    deliveryMethods.find(
      (method) => method.id === searchParams.get("delivery")
    ) ?? deliveryMethods[0];

  let basketSummary = 0;
  basket.forEach((item) => {
    basketSummary += item.product.price * item.quantity;
  });

  const deliveryPrice =
    basketSummary >= settings.free_delivery ? 0 : selectedDelivery.price;

  const totalValue =
    Math.round(
      ((basketSummary + deliveryPrice) * (1 + selectedPayment.fee) +
        Number.EPSILON) *
        100
    ) / 100;

  const proceedOrder = () => {
    const date = new Date();
    const order: IOrder = {
      basketContent: basket,
      deliveryType: selectedDelivery.id,
      deliveryValue: deliveryPrice,
      paymentType: selectedPayment.id,
      paymentFee: selectedPayment.fee,
      totalValue: totalValue,
      status: "new",
      orderDate: `${date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}`,
    };

    fetch(
      `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/order.json`,
      { method: "POST", body: JSON.stringify(order) }
    )
      .then((res) => {
        if (res.status === 200) {
          router.refresh();
          setSnackbarProps({
            snackbarOpen: true,
            proceedMessage: "Order successfully placed",
            alertSeverity: "success",
          });
          setTimeout(() => {
            setSnackbarProps({ ...snackbarProps, snackbarOpen: false });
            setBasket([]);
          }, 1000);
        } else {
          throw new Error("Error!");
        }
      })
      .catch((e) => {
        setSnackbarProps({
          snackbarOpen: true,
          proceedMessage: "Error",
          alertSeverity: "error",
        });
        setTimeout(() => {
          setSnackbarProps({ ...snackbarProps, snackbarOpen: false });
        }, 1000);
      });
  };

  return (
    <div className={styles.basket_summary}>
      <Typography variant="h5" textAlign={"center"} fontWeight={"550"}>
        Order summary
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <span>Item value:</span>{" "}
        <Typography fontWeight={"550"}>
          {basketSummary.toLocaleString("en-US", {
            style: "currency",
            currency: basket[0]?.product.currency ?? "USD",
          })}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <span>Delivery value:</span>{" "}
        <Typography fontWeight={"550"}>
          {deliveryPrice.toLocaleString("en-US", {
            style: "currency",
            currency: basket[0]?.product.currency ?? "USD",
          })}
        </Typography>
      </div>
      {deliveryPrice > 0 && (
        <>
          <LinearProgress
            variant="determinate"
            value={(basketSummary / settings.free_delivery) * 100}
            // sx={{ backgroundColor: "var(--accent)" }}
            color="inherit"
          />
          <Typography variant="caption" textAlign="right">
            Free shipping on orders over{" "}
            {settings.free_delivery.toLocaleString("en-US", {
              style: "currency",
              currency: basket[0]?.product.currency ?? "USD",
            })}
          </Typography>
        </>
      )}
      <hr />
      <PaymentMethodList
        paymentMethods={paymentMethods}
        selectedDelivery={selectedDelivery}
        selectedPayment={selectedPayment}
      />
      <DeliveryMethodList
        deliveryMethods={deliveryMethods}
        selectedDelivery={selectedDelivery}
        selectedPayment={selectedPayment}
        basketSummary={basketSummary}
      />
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "1rem",
        }}
      >
        <span>Total value:</span>{" "}
        <Typography variant="h6" fontWeight={"600"} color="var(--accent)">
          {totalValue.toLocaleString("en-US", {
            style: "currency",
            currency: basket[0]?.product.currency ?? "USD",
          })}
        </Typography>
      </div>
      <Button className={styles.basket_summary_proceed} onClick={proceedOrder}>
        Proceed
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarProps.snackbarOpen}
      >
        <Alert severity={snackbarProps.alertSeverity}>
          {snackbarProps.proceedMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
