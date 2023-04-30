import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.scss";
import { images } from "../../../constants";
import { useDispatch } from "react-redux";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import { IoMdArrowDropleft } from "react-icons/io";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);
  const sumReviews = filteredReviews.reduce(
    (acc, review) => acc + review.rate,
    0
  );
  const averageReviews = Math.round(sumReviews / filteredReviews.length);
  console.log(averageReviews);

  const addToCart = (product, selectedSize) => {
    if (selectedSize) {
      const tempProduct = { ...product, size: selectedSize };
      dispatch(ADD_TO_CART(tempProduct));
      dispatch(CALCULATE_TOTAL_QUANTITY());
    }
  };

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const object = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(object);
    } else {
      toast.error("Product not found");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <section className={styles.main_container}>
        <div className={styles.page_container}>
          {product === null ? (
            <img
              src={images.spinner}
              alt="Loading..."
              style={{ width: "200px" }}
              className="--center-all"
            />
          ) : (
            <>
              <Card>
                <div className={styles.product_container}>
                  <div className={styles.product_title}>
                    <h3>{product.name}</h3>
                  </div>
                  <div className={styles.back_button}>
                    <Link to="/#products">
                      <button>
                        {" "}
                        <IoMdArrowDropleft size={21} /> Back
                      </button>
                    </Link>
                  </div>
                  <div className={styles.img_container}>
                    <div>
                      <img src={product.imageURL} alt={product.name} />
                    </div>
                  </div>
                  <div className={styles.stars_container}>
                    <p>{filteredReviews.length} reviews</p>
                    <StarsRating value={averageReviews} disabled={true} />
                  </div>
                  <div className={styles.mobile_price_container}>
                    <p>£{product.price.toFixed(2)}</p>
                  </div>
                  <div className={styles.mobile_add_to_cart_container}>
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
                      <option
                        value={product.size.xs}
                        disabled={product.size.xs < 1}
                      >
                        XS
                      </option>
                      <option
                        value={product.size.s}
                        disabled={product.size.s < 1}
                      >
                        S
                      </option>
                      <option
                        value={product.size.m}
                        disabled={product.size.m < 1}
                      >
                        M
                      </option>
                      <option
                        value={product.size.l}
                        disabled={product.size.l < 1}
                      >
                        L
                      </option>
                      <option
                        value={product.size.xl}
                        disabled={product.size.xl < 1}
                      >
                        XL
                      </option>
                    </select>
                    <button
                      type="button"
                      disabled={!selectedSize}
                      className={`${
                        selectedSize
                          ? styles.button_active
                          : styles.button_disabled
                      }`}
                      onClick={() => addToCart(product, selectedSize)}
                    >
                      ADD TO CART
                    </button>
                  </div>
                  <div className={styles.mobile_line} />
                  <div className={styles.desc_container}>
                    <p>{product.desc}</p>
                  </div>
                  <div className={styles.line} />
                  <div className={styles.price_container}>
                    <p>£{product.price.toFixed(2)}</p>
                  </div>
                  <div className={styles.add_to_cart_container}>
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
                      <option
                        value={product.size.xs}
                        disabled={product.size.xs < 1}
                      >
                        XS
                      </option>
                      <option
                        value={product.size.s}
                        disabled={product.size.s < 1}
                      >
                        S
                      </option>
                      <option
                        value={product.size.m}
                        disabled={product.size.m < 1}
                      >
                        M
                      </option>
                      <option
                        value={product.size.l}
                        disabled={product.size.l < 1}
                      >
                        L
                      </option>
                      <option
                        value={product.size.xl}
                        disabled={product.size.xl < 1}
                      >
                        XL
                      </option>
                    </select>
                    <button
                      type="button"
                      disabled={!selectedSize}
                      className={`${
                        selectedSize
                          ? styles.button_active
                          : styles.button_disabled
                      }`}
                      onClick={() => addToCart(product, selectedSize)}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        <Card
          cardClass={
            filteredReviews.length === 0 ? styles.no_show : styles.review_card
          }
        >
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index} className={styles.review}>
                      <div className={styles.review_star}>
                        <StarsRating value={rate} disabled={true} />
                        <p>
                          by: <b>{userName}</b>
                        </p>
                      </div>

                      <p className={styles.review_text}>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </section>
    </>
  );
};

export default ProductDetails;
