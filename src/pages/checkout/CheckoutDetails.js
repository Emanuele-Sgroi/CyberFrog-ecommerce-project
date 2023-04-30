import React, { useState } from "react";
import styles from "./CheckoutDetails.module.scss";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary.js";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";
import { selectCartTotalAmount } from "../../redux/slice/cartSlice";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  county: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChecked === true) {
      setBillingAddress(shippingAddress);
      if (
        shippingAddress.name === billingAddress.name &&
        shippingAddress.line1 === billingAddress.line1 &&
        shippingAddress.line2 === billingAddress.line2 &&
        shippingAddress.city === billingAddress.city &&
        shippingAddress.county === billingAddress.county &&
        shippingAddress.postal_code === billingAddress.postal_code &&
        shippingAddress.country === billingAddress.country &&
        shippingAddress.phone === billingAddress.phone
      ) {
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
        dispatch(SAVE_BILLING_ADDRESS(shippingAddress));
        navigate("/checkout");
      }
    } else {
      dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
      dispatch(SAVE_BILLING_ADDRESS(billingAddress));
      navigate("/checkout");
    }
  };

  function handleKeyPress(event) {
    const charCode = event.which || event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  return (
    <>
      <section className={styles.main_container}>
        <Card cardClass={styles.checkout_container}>
          <h2>Checkout Details</h2>

          {/* CHECKOUT SUMMARY HERE */}
          <CheckoutSummary />
          <form onSubmit={handleSubmit}>
            {/* SHIPPING*/}
            <div className={styles.user_details}>
              <h2>Shipping Details</h2>
              <div className={styles.filling_form}>
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    name="name"
                    value={shippingAddress.name}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <div>
                  <label>Country</label>
                  <CountryDropdown
                    className={styles.select_country}
                    valueType="short"
                    value={shippingAddress.country}
                    onChange={(val) =>
                      handleShipping({
                        target: {
                          name: "country",
                          value: val,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label>Address Line 1</label>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    required
                    name="line1"
                    value={shippingAddress.line1}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <div>
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    placeholder="Address Line 2"
                    required
                    name="line2"
                    value={shippingAddress.line2}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="City"
                    required
                    name="city"
                    value={shippingAddress.city}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <div>
                  <label>County &#40;optional&#41;</label>
                  <input
                    type="text"
                    placeholder="County"
                    name="county"
                    value={shippingAddress.county}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <div>
                  <label>Postcode</label>
                  <input
                    type="text"
                    placeholder="Postcode"
                    required
                    name="postal_code"
                    value={shippingAddress.postal_code}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    name="phone"
                    value={shippingAddress.phone}
                    onKeyPress={(e) => handleKeyPress(e)}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
              </div>
            </div>
            {/* BILLING*/}
            <div className={`--m2 ${styles.user_details}`}>
              <h2>Billing Address</h2>
              <div className={styles.checkbox_container}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckbox}
                />
                <label>My billing and shipping address are the same</label>
              </div>
              <div
                className={`${
                  !isChecked ? styles.filling_form : styles.closed_filling_form
                }`}
              >
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={billingAddress.name}
                    onChange={(e) => handleBilling(e)}
                    required={isChecked ? false : true}
                  />
                </div>
                <div>
                  <label>Country</label>
                  <CountryDropdown
                    className={styles.select_country}
                    valueType="short"
                    value={billingAddress.country}
                    onChange={(val) =>
                      handleBilling({
                        target: {
                          name: "country",
                          value: val,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label>Address Line 1</label>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    required={isChecked ? false : true}
                    name="line1"
                    value={billingAddress.line1}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>
                <div>
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    placeholder="Address Line 2"
                    required={isChecked ? false : true}
                    name="line2"
                    value={billingAddress.line2}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="City"
                    required={isChecked ? false : true}
                    name="city"
                    value={billingAddress.city}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>
                <div>
                  <label>County &#40;optional&#41;</label>
                  <input
                    type="text"
                    placeholder="County"
                    name="county"
                    value={billingAddress.county}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>
                <div>
                  <label>Postcode</label>
                  <input
                    type="text"
                    placeholder="Postcode"
                    required={isChecked ? false : true}
                    name="postal_code"
                    value={billingAddress.postal_code}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required={isChecked ? false : true}
                    name="phone"
                    value={billingAddress.phone}
                    onKeyPress={(e) => handleKeyPress(e)}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.checkout_btn}>
              <h1 className={styles.summary_price}>
                You are about to pay{" "}
                <span>{`£${cartTotalAmount.toFixed(2)}`}</span>
              </h1>
              <button type="submit">Proceed To Payment</button>
            </div>
          </form>
        </Card>
      </section>
    </>
  );
};

export default CheckoutDetails;
