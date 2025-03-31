import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";
import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";
import { TbShoppingCartPlus } from "react-icons/tb";

const ProductItem = ({
  product,
  grid,
  id,
  name,
  price,
  desc,
  size,
  imageURL,
}) => {
  const [selectedSize, setSelectedSize] = useState("");

  const itemTitleShort = (text, n) => {
    if (text.length > n) {
      const shortTitle = text.substring(0, n).concat("...");
      return shortTitle;
    }
    return text;
  };

  const dispatch = useDispatch();

  const addToCart = (product, selectedSize) => {
    if (selectedSize) {
      const tempProduct = { ...product, size: selectedSize };
      dispatch(ADD_TO_CART(tempProduct));
      dispatch(CALCULATE_TOTAL_QUANTITY());
    }
  };

  return (
    <>
      <div className={grid ? `${styles.grid_item}` : `${styles.no_display}`}>
        <div cardClass={styles.card_products}>
          <div className={styles.product_img}>
            <Link to={`/product-details/${id}`}>
              <div className={styles.img_container}>
                <img src={imageURL} alt={name} />
              </div>
            </Link>
          </div>

          <div className={styles.product_details}>
            <div className={styles.product_title}>
              <h4>{itemTitleShort(name, 18)}</h4>
            </div>
            <div className={styles.product_price}>
              <p>{`£${price.toFixed(2)}`}</p>
              <div>
                <select
                  name="select size"
                  defaultValue=""
                  onChange={(e) =>
                    setSelectedSize(
                      e.target.options[e.target.selectedIndex].label +
                        e.target.value
                    )
                  }
                  required
                >
                  <option value="" selected disabled>
                    Select Size
                  </option>
                  <option value={size.xs} disabled={size.xs < 1}>
                    XS
                  </option>
                  <option value={size.s} disabled={size.s < 1}>
                    S
                  </option>
                  <option value={size.m} disabled={size.m < 1}>
                    M
                  </option>
                  <option value={size.l} disabled={size.l < 1}>
                    L
                  </option>
                  <option value={size.xl} disabled={size.xl < 1}>
                    XL
                  </option>
                </select>
                <button
                  type="button"
                  onClick={() => addToCart(product, selectedSize)}
                  disabled={!selectedSize}
                  className={`${
                    selectedSize ? styles.button_active : styles.button_disabled
                  }`}
                >
                  <TbShoppingCartPlus size={30} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card cardClass={!grid ? `${styles.list_item}` : `${styles.no_display}`}>
        <div className={styles.list_item_img}>
          <Link to={`/product-details/${id}`}>
            <div>
              <img src={imageURL} alt={name} />
            </div>
          </Link>
        </div>
        <div className={styles.list_item_details}>
          <div className={styles.list_item_title}>
            <h4>{itemTitleShort(name, 30)}</h4>
          </div>
          <div className={styles.list_item_description}>
            <p>{itemTitleShort(desc, 200)}</p>
          </div>
          <div className={styles.list_item_actions}>
            <p>{`£${price.toFixed(2)}`}</p>
            <div className={styles.list_item_buttons}>
              <div>
                <select
                  name="select size"
                  defaultValue=""
                  onChange={(e) => setSelectedSize(e)}
                  required
                >
                  <option value="" selected disabled>
                    Select Size
                  </option>
                  <option value={size.xs} disabled={size.xs < 1}>
                    XS
                  </option>
                  <option value={size.s} disabled={size.s < 1}>
                    S
                  </option>
                  <option value={size.m} disabled={size.m < 1}>
                    M
                  </option>
                  <option value={size.l} disabled={size.l < 1}>
                    L
                  </option>
                  <option value={size.xl} disabled={size.xl < 1}>
                    XL
                  </option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => addToCart(product, selectedSize)}
                disabled={!selectedSize}
                className={`${selectedSize ? styles.button_active : styles.button_disabled}`}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProductItem;
