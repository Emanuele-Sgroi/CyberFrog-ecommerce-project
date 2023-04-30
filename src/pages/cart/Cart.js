import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import styles from "./Cart.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { images } from "../../constants";
import { IoMdArrowDropleft } from "react-icons/io";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const itemTitleShort = (text, n) => {
    if (text.length > n) {
      const shortTitle = text.substring(0, n).concat("...");
      return shortTitle;
    }
    return text;
  };

  const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [cartItems, dispatch]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <>
      <section className={styles.main_container}>
        <Card cardClass={styles.card_container}>
          <div className={styles.page_container}>
            <div className={styles.cart_header}>
              <h2>Shopping Cart</h2>
            </div>
            {cartItems.length === 0 ? (
              <>
                <div className={styles.empty_cart_message}>
                  <img src={images.emptycart} alt="empty cart" />
                  <div>
                    <p>Your cart is empty!</p>
                    <Link to="/#products">
                      <button>
                        {" "}
                        <IoMdArrowDropleft size={21} /> Back to shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.full_cart_container}>
                  <div className={styles.top_buttons}>
                    <Link to="/#products">
                      <button>Continue Shopping</button>
                    </Link>
                    <button className={styles.checkout_btn} onClick={checkout}>
                      Proceed to Checkout
                    </button>
                  </div>
                  <div className={styles.info_container}>
                    <div>
                      <h4>
                        Item&#40;s&#41; in you cart:
                        <span>{cartTotalQuantity}</span>
                      </h4>

                      <h4>
                        Cart Total:
                        <span>{`£${cartTotalAmount.toFixed(2)}`}</span>
                      </h4>
                      <p>Including VAT</p>
                    </div>
                    <button onClick={clearCart}>Clear Cart</button>
                  </div>
                  <div className={styles.table_container}>
                    <table>
                      <thead className={styles.table_head}>
                        <tr>
                          <th>s/n</th>
                          <th>Product</th>
                          <th>Size</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((cart, index) => {
                          const {
                            id,
                            name,
                            price,
                            imageURL,
                            cartQuantity,
                            size,
                          } = cart;
                          const matches = size.match(/^([a-zA-Z]+)(\d+)$/);
                          return (
                            <tr key={id}>
                              <td>{index + 1}</td>
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
                              <td>
                                <div className={styles.count}>
                                  <button
                                    className="--btn"
                                    onClick={() => decreaseCart(cart)}
                                  >
                                    -
                                  </button>
                                  <p>
                                    <b>{cartQuantity}&nbsp;</b>
                                  </p>
                                  <button
                                    className="--btn"
                                    onClick={() => {
                                      if (cartQuantity < parseInt(matches[2])) {
                                        increaseCart(cart);
                                      }
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td>{price.toFixed(2)}</td>
                              <td>{(price * cartQuantity).toFixed(2)}</td>
                              <td className={styles.icons}>
                                <FaTrashAlt
                                  size={19}
                                  color="red"
                                  onClick={() => removeFromCart(cart)}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className={`${
                      cartTotalQuantity > 1
                        ? styles.bottom_buttons
                        : styles.no_show
                    }`}
                  >
                    <Link to="/#products">
                      <button>Continue Shopping</button>
                    </Link>
                    <button className={styles.checkout_btn} onClick={checkout}>
                      Proceed to Checkout
                    </button>
                  </div>

                  {/* MOBILE SECTION */}

                  <div className={styles.mobile_container}>
                    {cartItems.map((cart, index) => {
                      const { id, name, price, imageURL, cartQuantity, size } =
                        cart;
                      const matches = size.match(/^([a-zA-Z]+)(\d+)$/);
                      return (
                        <div
                          key={id}
                          className={styles.mobile_cart_item_container}
                        >
                          <div className={styles.mobile_item_top}>
                            <img src={imageURL} alt={name} />
                            <div>
                              <h2>{itemTitleShort(name, 32)}</h2>
                              <p>
                                Size: <span>{matches[1]}</span>
                              </p>
                              <h4>{`£${(price * cartQuantity).toFixed(2)}`}</h4>
                              <div>
                                <div>
                                  <button onClick={() => decreaseCart(cart)}>
                                    {" "}
                                    -{" "}
                                  </button>
                                  <p>{cartQuantity}</p>
                                  <button
                                    onClick={() => {
                                      if (cartQuantity < parseInt(matches[2])) {
                                        increaseCart(cart);
                                      }
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                                <button onClick={() => removeFromCart(cart)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.mobile_buttons}>
                    <Link to="/#products">
                      <h2>Continue Shopping</h2>
                    </Link>
                    <button
                      className={styles.checkout_btn_mobile}
                      onClick={checkout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      </section>
    </>
  );
};

export default Cart;
