import React from "react";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import styles from "./CheckoutSummary.module.scss";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  const itemTitleShort = (text, n) => {
    if (text.length > n) {
      const shortTitle = text.substring(0, n).concat("...");
      return shortTitle;
    }
    return text;
  };

  return (
    <>
      <div className={styles.summary_container}>
        <div className={styles.summary_header}>
          <h3>Cart Content</h3>
          <h3 style={{ fontSize: "27px" }}>{`£${cartTotalAmount.toFixed(
            2
          )}`}</h3>
        </div>
        <table>
          <thead className={styles.table_head}>
            <tr>
              <th>Product Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity, size } = item;
              const matches = size.match(/^([a-zA-Z]+)(\d+)$/);
              return (
                <tr key={id}>
                  <td>
                    <p>
                      <b>{name}</b>
                    </p>
                  </td>
                  <td>{matches[1]}</td>
                  <td>{`£${price.toFixed(2)}`}</td>
                  <td>{cartQuantity}</td>
                  <td>{`£${(price * cartQuantity).toFixed(2)}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.summary_container_mobile}>
        <h1 className={styles.summary_header_mobile}>
          Cart content: <span>{`£${cartTotalAmount.toFixed(2)}`}</span>
        </h1>
        <div className={styles.line} />
        <div className={styles.summary_items}>
          {cartItems.map((item, index) => {
            const { id, name, price, cartQuantity, size } = item;
            const matches = size.match(/^([a-zA-Z]+)(\d+)$/);
            return (
              <div id={id}>
                <h1>{itemTitleShort(name, 34)}</h1>
                <div>
                  <p>Size: {matches[1]}</p>
                  <p>Quantity: {cartQuantity}</p>
                </div>
                <h5>
                  Subtotal:{" "}
                  <span>{`£${(price * cartQuantity).toFixed(2)}`}</span>
                </h5>
                <div className={styles.line2} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CheckoutSummary;
