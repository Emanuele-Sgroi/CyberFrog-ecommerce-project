import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { images } from "../../../constants";

const activeLink = ({ isActive }) =>
  isActive ? `${styles.active}` : `${styles.not_active}`;

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <img src={images.dashboard} alt="dashboard" />
        <h4>Admin Panel</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
