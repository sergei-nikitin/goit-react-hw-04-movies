import React from "react";
import Navigations from "../navigation";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Navigations />
    </header>
  );
};

export default Header;
