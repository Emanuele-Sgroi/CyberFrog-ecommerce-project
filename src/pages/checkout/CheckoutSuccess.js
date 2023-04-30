import React from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./CheckoutSuccess.module.scss";
import { images } from "../../constants";
import Card from "../../components/card/Card";

const CheckoutSuccess = () => {
  const location = useLocation();
  const orderNumber = new URLSearchParams(location.search).get("orderNumber");

  return (
    <section className={styles.success_main_container}>
      <Card cardClass={styles.success_container}>
        <div className={styles.success_info}>
          <div className={styles.icon_container}>
            <h3>Order Confirmed</h3>
            <img src={images.success} alt="success" />
          </div>
          <h2>
            Thank you for shopping at <span>Cyber Frog</span>
          </h2>
          <h4>Order Number #{orderNumber}</h4>
          <div className={styles.line} />
          <p>You will receive an email with your order confirmation shortly.</p>
          <button className={styles.success_button}>
            <Link to="/order-history">View Order Status</Link>
          </button>
        </div>
        <div className={styles.success_photo}>
          <button className={styles.shopping_button}>
            <Link to="/#products">Continue Shopping</Link>
          </button>
        </div>
      </Card>
    </section>
  );
};

export default CheckoutSuccess;
