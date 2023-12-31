import { useBasket } from "@/app/context/BasketContext";
import { useSettings } from "@/app/context/SettingsContext";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import styles from "./BasketSummary.module.css";
import Link from "next/link";

export default function BasketSummary() {
  const { basket, setBasket } = useBasket();
  const settings = useSettings();

  let basketSummary = 0;
  basket.forEach((item) => {
    basketSummary += item.product.price * item.quantity;
  });

  const deliveryPrice =
    basketSummary >= settings.free_delivery ? 0 : settings.delivery_price;

  const totalValue = basketSummary + deliveryPrice;

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
      <Link href="/basket?phase=delivery">
        <Button className={styles.basket_summary_proceed}>Proceed</Button>
      </Link>
    </div>
  );
}
