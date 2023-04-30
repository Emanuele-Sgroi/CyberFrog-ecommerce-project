import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import Card from "../card/Card";
import styles from "./ReviewProducts.module.scss";
import StarsRating from "react-star-rate";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { images } from "../../constants";
import { IoMdArrowDropleft } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      const today = new Date();
      const date = today.toDateString();
      const reviewConfig = {
        userID,
        userName,
        productID: id,
        rate,
        review,
        reviewDate: date,
        createdAt: Timestamp.now().toDate(),
      };
      try {
        addDoc(collection(db, "reviews"), reviewConfig);
        toast.success("Review submitted successfully");
        setRate(0);
        setReview("");
        setTimeout(() => {
          navigate("/order-history");
          setIsSubmitted(false);
        }, 5000); // 5 seconds delay
      } catch (error) {
        toast.error("couldn't submit review");
        console.log(error.message);
      }
    }, 1000);
  };

  return (
    <section className={styles.review_main_container}>
      <Card cardClass={styles.review_container}>
        <h2>Review Products</h2>
        {product === null ? (
          <img
            src={images.spinner}
            alt="Loading..."
            style={{ width: "50px" }}
          />
        ) : (
          <>
            <div className={styles.back_button}>
              <Link to={`/order-history`}>
                <IoMdArrowDropleft /> Back
              </Link>
            </div>
            <p>{product.name}</p>
            <div className={styles.image_box}>
              <img src={product.imageURL} alt={product.name} />
            </div>
          </>
        )}

        <div className={styles.form_container}>
          <form onSubmit={(e) => submitReview(e)}>
            <label className={styles.label_rating}>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              placeholder="Your review..."
            ></textarea>
            <div className={styles.submit_box}>
              <button
                type="submit"
                className={
                  isSubmitted ? styles.no_show : styles.btn_not_submitted
                }
                style={{ opacity: isLoading ? 0 : 1 }}
                disabled={isLoading}
              >
                {!isLoading && "Submit Review"}
              </button>
              {isLoading && (
                <img
                  src={images.spinner}
                  alt="Loading"
                  style={{ width: "50px" }}
                />
              )}
              <h4 className={isSubmitted ? styles.thanks : styles.no_show}>
                THANK YOU
              </h4>
            </div>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default ReviewProducts;
