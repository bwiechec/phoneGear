import Link from "next/link";
import styles from "./menu.module.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

export default function Menu() {
  return (
    <nav className={styles.menu}>
      <Link href="/">PhoneGear</Link>
      <div className={styles.menu_options}>
        <Link href="/cases">Phone cases</Link>
        <Link href="/adapters">Charging adapters</Link>
        <Link href="/cables">Cables</Link>
      </div>
      <div className={styles.menu_user_actions}>
        <Link href="/user">
          <AccountBoxOutlinedIcon />
        </Link>
        <Link href="/basket">
          <ShoppingBagOutlinedIcon />
        </Link>
      </div>
    </nav>
  );
}
