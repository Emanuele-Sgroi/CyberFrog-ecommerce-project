import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.scss";
import { images } from "../../constants";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  // Save order to Order History
  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/London",
    };
    const datetime = today
      .toLocaleString("en-GB", options)
      .replace(/[^\d]/g, "");
    const randomNumber = Math.floor(Math.random() * 999);
    const orderNumber =
      datetime.substring(0, 8) +
      datetime.substring(8, 14) +
      randomNumber.toString();
    const orderConfig = {
      userID,
      userEmail,
      orderNumber: orderNumber,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order saved");

      const templateParams = {
        user_email: userEmail,
        to_name: userEmail,
        order_number: orderNumber,
        message: `Dear Customer, Thank you for shopping at Cyber Frog, your order Number is #${orderNumber}`,
      };

      emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          "template_x2pysu3",
          templateParams,
          "02NEV85HSeVMzUTzB"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );

      navigate(`/checkout-success?orderNumber=${orderNumber}`);
    } catch (error) {
      toast.error("ERROR! Something went wrong");
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // change this to your payment confirmation page!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  --- IMPORTANT ---
          //https://cyber-frog.co.uk/checkout-success
          //http://localhost:3000/checkout-success
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        console.log("confirmPayment response:", result);
        // ok - paymentIntent // bad - error
        if (result.error) {
          toast.error("ERROR! Something went wrong");
          console.log(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.payment_main_container}>
        <h2>Payment</h2>
        <form onSubmit={handleSubmit}>
          <PaymentElement id={styles["payment-element"]} />
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className={styles.button}
          >
            <span id="button-text">
              {isLoading ? (
                <img
                  src={images.spinner}
                  alt="Loading..."
                  style={{ width: "20px" }}
                />
              ) : (
                "Make Payment"
              )}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && <div className={styles.message}>{message}</div>}
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
