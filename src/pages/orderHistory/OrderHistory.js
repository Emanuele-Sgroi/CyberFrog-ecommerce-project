import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectUserID } from "../../redux/slice/authSlice";
import { selectOrderHistory, STORE_ORDERS } from "../../redux/slice/orderSlice";
import styles from "./OrderHistory.module.scss";
import Card from "../../components/card/Card";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userID === userID);

  return (
    <>
      <section className={styles.orderHistory_main_container}>
        <Card cardClass={styles.orderHistory_container}>
          <>
            {isLoading && <Loader />}
            <div className={styles.table}>
              {filteredOrders.length === 0 ? (
                <p className={styles.no_orders} style={{ color: "#fff" }}>
                  No order found
                </p>
              ) : (
                <>
                  <div className={styles.orderHistory_header}>
                    <h2>Order History</h2>
                  </div>
                  <div className={styles.orderHistory_sub_header}>
                    <p>Check your Orders and leave a review</p>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>s/n</th>
                        <th>Date</th>
                        <th>Order ID</th>
                        <th>Order Amount</th>
                        <th>Order Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order, index) => {
                        const {
                          id,
                          orderNumber,
                          orderDate,
                          orderTime,
                          orderAmount,
                          orderStatus,
                        } = order;
                        return (
                          <tr key={id} onClick={() => handleClick(id)}>
                            <td>{index + 1}</td>
                            <td>
                              {orderDate} at {orderTime}
                            </td>
                            <td>#{orderNumber}</td>
                            <td>
                              {"£"}
                              {orderAmount.toFixed(2)}
                            </td>
                            <td>
                              <p
                                className={
                                  orderStatus === "Delivered"
                                    ? `${styles.delivered}`
                                    : "" || orderStatus === "Order Placed"
                                    ? `${styles.placed}`
                                    : "" || orderStatus === "Processing"
                                    ? `${styles.processing}`
                                    : "" || orderStatus === "Shipped"
                                    ? `${styles.shipped}`
                                    : ""
                                }
                              >
                                {orderStatus}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )}
            </div>

            <div
              className={`${
                filteredOrders.length === 0
                  ? styles.orderHistory_mobile_no_order
                  : styles.orderHistory_mobile
              }`}
            >
              {filteredOrders.length === 0 ? (
                <p style={{ color: "#fff" }}>No order found</p>
              ) : (
                <div className={styles.order_items_container}>
                  <div className={styles.orderHistory_header}>
                    <h2>Order History</h2>
                  </div>
                  <div className={styles.orderHistory_sub_header}>
                    <p>Check your Orders and leave a review</p>
                  </div>
                  {filteredOrders.map((order, index) => {
                    const {
                      id,
                      orderNumber,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <div
                        key={id}
                        className={styles.order_box}
                        onClick={() => handleClick(id)}
                      >
                        <div className={styles.order_number}>
                          <h4>
                            S/N: <b>{index + 1}</b>
                          </h4>
                        </div>
                        <div className={styles.order_info}>
                          <h3>#{orderNumber}</h3>
                          <p>
                            Created the <b>{orderDate}</b> at <b>{orderTime}</b>
                          </p>
                          <p>
                            Paid: <b>£{orderAmount.toFixed(2)}</b>
                          </p>
                          <p>
                            Status:&nbsp;
                            <b
                              className={
                                orderStatus === "Delivered"
                                  ? `${styles.delivered}`
                                  : "" || orderStatus === "Order Placed"
                                  ? `${styles.placed}`
                                  : "" || orderStatus === "Processing"
                                  ? `${styles.processing}`
                                  : "" || orderStatus === "Shipped"
                                  ? `${styles.shipped}`
                                  : ""
                              }
                            >
                              {orderStatus}
                            </b>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        </Card>
      </section>
    </>
  );
};

export default OrderHistory;
