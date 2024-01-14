import { IBasket, IOrder } from "@/app/lib/types/types";
import styles from "./OrderItem.module.css";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface IOrderItem {
  item: IBasket;
}

export default function OrderItem({ item }: IOrderItem) {
  return (
    <>
      <div className={styles.order_item}>
        <Link
          href={`/product/${item.product.id}`}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            loading="lazy"
            src={item.product.imageUrl}
            alt={item.product.name}
            width={75}
            height={75}
            style={{ height: "auto" }}
          />
          <Typography>{item.product.name}</Typography>
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5rem",
          }}
        >
          <Typography>
            {item.quantity} x{" "}
            {item.product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
          <Typography fontWeight={600}>
            {(item.quantity * item.product.price).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
        </div>
      </div>
      <hr
        style={{
          margin: "0.5rem auto",
        }}
      />
    </>
  );
}
