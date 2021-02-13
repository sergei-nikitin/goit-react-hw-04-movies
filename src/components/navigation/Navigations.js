import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav>
      <NavLink
        className={styles.navLink}
        activeClassName={styles.active}
        exact
        to={routes.home}
      >
        Home
      </NavLink>
      <NavLink
        className={styles.navLink}
        activeClassName={styles.active}
        to={routes.movies}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
