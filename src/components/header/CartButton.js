import React, { useEffect } from "react";
import "./CartButton.scss";
import { Link } from "react-router-dom";
import { IoIosCart } from "react-icons/io";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export function CartButton() {
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch]);

  return (
    <span className="app__header_nav_cart">
      <Link to="/cart">
        <IoIosCart size={22} />
        <h6>Cart</h6>
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );
}
