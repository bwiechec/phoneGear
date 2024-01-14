import { IBasket, IOrder } from "@/app/lib/types/types";
import styles from "./OrderCard.module.css";
import Typography from "@mui/material/Typography";
import OrderItem from "../OrderItem/OrderItem";
import Link from "next/link";
import { GearButton } from "../GearButton/GearButton";

interface IOrderCard {
  order: {
    id: string;
    basketContent: IBasket[];
    is_sliced?: boolean;
    sliced_count?: number;
    deliveryType: string;
    deliveryValue: number;
    paymentType: string;
    status: string;
    totalValue: number;
    orderDate: string;
  };
  onList?: boolean;
}

export default function OrderCard({ order, onList }: IOrderCard) {
  return (
    <div className={styles.order} key={order.id}>
      {onList && order.orderDate && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0.25rem",
            gap: "2rem",
          }}
        >
          <Typography fontWeight={600}>order date</Typography>{" "}
          <Typography fontWeight={600}>{order.orderDate}</Typography>
        </div>
      )}
      {order.basketContent.map((item) => {
        return <OrderItem item={item} />;
      })}
      {order.is_sliced && (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            + {order.sliced_count} more
          </div>
          <hr
            style={{
              margin: "0.5rem auto",
            }}
          />
        </>
      )}
      {onList && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5rem 2rem",
            }}
          >
            <Typography fontWeight={600}>Total value</Typography>
            <Typography variant="h6" fontWeight={600}>
              {order.totalValue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
          </div>
          <Link
            href={`/order/${order.id}`}
            style={{
              maxWidth: "200px",
              marginInline: "auto",
              marginBottom: "-1rem",
            }}
          >
            <GearButton sx={{ padding: "0.5rem" }}>More details</GearButton>
          </Link>
        </>
      )}
    </div>
  );
}
