"use client";

import Link from "next/link";
import styles from "./menu.module.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function Menu() {
  const showMenuOptions = () => {
    const options = document.getElementsByClassName(styles.menu_options)[0];
    options.classList.contains(styles.menu_options_show)
      ? options.classList.remove(styles.menu_options_show)
      : options.classList.add(styles.menu_options_show);
  };

  const removeMenuOptions = () => {
    const options = document.getElementsByClassName(styles.menu_options)[0];
    if (options.classList.contains(styles.menu_options_show))
      options.classList.remove(styles.menu_options_show);
  };

  return (
    <nav className={styles.menu}>
      <div className={styles.menu_options_open} onClick={showMenuOptions}>
        <MenuOutlinedIcon />
      </div>
      <Link href="/">PhoneGear</Link>
      <div className={styles.menu_options}>
        <Link onClick={removeMenuOptions} href="/cases">
          Phone cases
        </Link>
        <Link onClick={removeMenuOptions} href="/adapters">
          Charging adapters
        </Link>
        <Link onClick={removeMenuOptions} href="/cables">
          Cables
        </Link>
        <div
          className={styles.fake_background}
          onClick={removeMenuOptions}
        ></div>
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
