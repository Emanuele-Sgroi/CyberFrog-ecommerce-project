import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Product.module.scss";
import ProductList from "./productList/ProductList";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import { images } from "../../constants";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <div>
      <div className={`container ${styles.product}`}>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={images.spinner}
              alt="Loading"
              style={{ width: "100px" }}
              className="--center-all"
            />
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
