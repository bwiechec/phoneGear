import { IDeliveryMethod, IOrder, IPaymentMethod } from "@/app/lib/types/types";
import Typography from "@mui/material/Typography";
import styles from "./OrderDetails.module.css";

interface IOrderDetails {
  orderData: IOrder;
  deliveryMethods: IDeliveryMethod[];
  paymentMethods: IPaymentMethod[];
}

export function OrderDetails({
  orderData,
  deliveryMethods,
  paymentMethods,
}: IOrderDetails) {
  return (
    <div className={styles.order_details}>
      <div className={styles.order_details_info}>
        <Typography>Payment type </Typography>
        <Typography fontWeight={600}>
          {
            paymentMethods.find((method) => method.id === orderData.paymentType)
              ?.name
          }
        </Typography>
      </div>
      {orderData.paymentFee > 0 && (
        <div className={styles.order_details_info}>
          <Typography>Payment fee</Typography>
          <Typography fontWeight={600}>{orderData.paymentFee}</Typography>
        </div>
      )}
      <div className={styles.order_details_info}>
        <Typography>Delivery type </Typography>
        <Typography fontWeight={600}>
          {
            deliveryMethods.find(
              (method) => method.id === orderData.deliveryType
            )?.name
          }
        </Typography>
      </div>
      <div className={styles.order_details_info}>
        <Typography>Delivery value</Typography>
        <Typography fontWeight={600}>
          {orderData.deliveryValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
      </div>
      {orderData.orderDate && (
        <div className={styles.order_details_info}>
          <Typography>Order date</Typography>
          <Typography fontWeight={600}>{orderData.orderDate}</Typography>
        </div>
      )}
      <div className={styles.order_details_info}>
        <Typography>Order status</Typography>
        <Typography fontWeight={600}>{orderData.status}</Typography>
      </div>
      <div className={styles.order_details_info}>
        <Typography>Total value</Typography>
        <Typography variant="h6" fontWeight={600}>
          {orderData.totalValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
      </div>
    </div>
  );
}
