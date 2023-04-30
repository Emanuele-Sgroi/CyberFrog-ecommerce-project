import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinner from "../../assets/spinner.gif";
import styles from "./OrderDetails.module.scss";
import Card from "../../components/card/Card";
import { IoMdArrowDropleft } from "react-icons/io";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  const itemTitleShort = (text, n) => {
    if (text.length > n) {
      const shortTitle = text.substring(0, n).concat("...");
      return shortTitle;
    }
    return text;
  };

  return (
    <section className={styles.details_main_container}>
      <Card cardClass={`container ${styles.card_container}`}>
        <h2>Order Details</h2>
        <div className={styles.details_button}>
          <div>
            <Link to="/order-history">
              <IoMdArrowDropleft /> Orders
            </Link>
          </div>
        </div>
        <br />
        {order === null ? (
          <img src={spinner} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details_info}>
              <div>
                <p>
                  <b>Order Number</b> #{order.orderNumber}
                </p>
                <p>
                  <b>Order Amount</b> £{order.orderAmount.toFixed(2)}
                </p>
                <p>
                  <b>Order Status</b>{" "}
                  {order.orderStatus === "Order Placed"
                    ? "Pending"
                    : order.orderStatus}
                </p>
              </div>
            </div>

            <br />
            <table className={styles.table}>
              <thead className={styles.table_head}>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {order.cartItems.map((cart, index) => {
                  const { id, name, size, price, imageURL, cartQuantity } =
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
                      <td>{price.toFixed(2)}</td>
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td>
                        <Link
                          to={`/review-product/${id}`}
                          className={styles.review_button}
                        >
                          <button>Review Product</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* ---- MOBILE ---- */}

            <div className={styles.mobile_container}>
              {order.cartItems.map((cart, index) => {
                const { id, name, size, price, imageURL, cartQuantity } = cart;
                const matches = size.match(/^([a-zA-Z]+)(\d+)$/);
                return (
                  <div key={id} className={styles.mobile_cart_item_container}>
                    <div className={styles.mobile_item_top}>
                      <img src={imageURL} alt={name} />
                      <div>
                        <h2>{itemTitleShort(name, 32)}</h2>
                        <div className={styles.group}>
                          <p>
                            Size: <span>{matches[1]}</span>
                          </p>
                          <p>
                            Qty <span>{cartQuantity}</span>
                          </p>
                        </div>

                        <p>
                          Total price:
                          <span>{`£${(price * cartQuantity).toFixed(2)}`}</span>
                        </p>

                        <Link
                          to={`/review-product/${id}`}
                          className={styles.review_button}
                        >
                          <button>Review Product</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Card>
    </section>
  );
};

export default OrderDetails;
