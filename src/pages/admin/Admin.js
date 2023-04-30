import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import {
  AddProduct,
  Home,
  Navbar,
  OrderDetails,
  Orders,
  ViewProducts,
  FakeNav,
} from "../../components/admin";
import styles from "./Admin.module.scss";

const Admin = () => {
  return (
    <>
      <div className={styles.desktop_admin}>
        <FakeNav />
        <div className={styles.admin}>
          <div className={styles.navbar}>
            <Navbar />
          </div>
          <div className={styles.content}>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="all-products" element={<ViewProducts />} />
              <Route path="add-product/:id" element={<AddProduct />} />
              <Route path="orders" element={<Orders />} />
              <Route path="order-details/:id" element={<OrderDetails />} />
            </Routes>
          </div>
        </div>
      </div>

      <div className={styles.mobile_admin} style={{ height: "80vh" }}>
        <div className="container">
          <h2>Can't Open Admin dashboard.</h2>
          <p>This section is available only from desktop.</p>
          <br />
          <Link to="/">
            <button className="--btn">&larr; Back To Home</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Admin;
