import React, { useEffect, useState } from "react";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import styles from "./OrderDetails.module.scss";
import spinner from "../../../assets/spinner.gif";
import { Link, useParams } from "react-router-dom";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";
import { IoMdArrowDropleft } from "react-icons/io";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={styles.table}>
        <h2>Order Details</h2>
        <div className={styles.back_btn}>
          <Link to="/admin/orders">
            <IoMdArrowDropleft /> Back To Orders
          </Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinner} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID &nbsp;</b> {order.id}
            </p>
            <p>
              <b>Order Number &nbsp;</b> #{order.orderNumber}
            </p>
            <p>
              <b>Amount &nbsp;</b> £{order.orderAmount}
            </p>
            <p>
              <b>Status &nbsp;</b> {order.orderStatus}
            </p>
            <p>
              <b>Shipping Address &nbsp;</b>
              {order.shippingAddress.line1} &nbsp;
              {order.shippingAddress.line2}, &nbsp;
              {order.shippingAddress.postal_code}, &nbsp;
              {order.shippingAddress.city}, &nbsp;
              {order.shippingAddress.country}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity, size } =
                    cart;
                  const matches = size.match(/^([a-zA-Z]+)(\d+)$/);
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{matches[1]}</td>
                      <td>{price}</td>
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

export default OrderDetails;
