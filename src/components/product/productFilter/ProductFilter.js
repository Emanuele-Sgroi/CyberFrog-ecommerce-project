import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductFilter.module.scss";
import { selectProducts } from "../../../redux/slice/productSlice";
import { FILTER_BY_CATEGORY_GENDER_AND_SEARCH } from "../../../redux/slice/filterSlice";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgClose } from "react-icons/cg";

const ProductFilter = ({ search }) => {
  const [category, setCategory] = useState("All");
  const [gender, setGender] = useState("All");
  const [mobileFilters, setMobileFilters] = useState(false);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  const allGenders = ["All", ...new Set(products.map((item) => item.gender))];

  useEffect(() => {
    dispatch(
      FILTER_BY_CATEGORY_GENDER_AND_SEARCH({
        products,
        category,
        gender,
        search,
      })
    );
  }, [dispatch, products, category, gender, search]);

  const clearFilters = () => {
    setCategory("All");
    setGender("All");
  };

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.gender_container}>
          <label>Gender:</label>
          <select
            className={styles.gender_select}
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            {allGenders.map((gen, index) => {
              return (
                <option
                  className={styles.selected_option}
                  key={index}
                  value={gen}
                >
                  {gen}
                </option>
              );
            })}
          </select>
        </div>

        <div className={styles.category_container}>
          <label>Category:</label>
          <select
            className={styles.category_select}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {allCategories.map((cat, index) => {
              return (
                <option key={index} value={cat}>
                  {cat}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.clear_filter}>
          <button
            onClick={() => {
              clearFilters();
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className={styles.mobile_filters}>
        <div
          className={`${styles.mobile_content} ${
            mobileFilters
              ? styles.mobile_content_active
              : styles.mobile_content_not_active
          }`}
        >
          <div className={styles.mobile_filters_selections}>
            <div className={styles.mobile_gender}>
              <label>Gender:</label>
              <select
                className={styles.gender_select}
                value={gender}
                onChange={(event) => setGender(event.target.value)}
              >
                {allGenders.map((gen, index) => {
                  return (
                    <option
                      className={styles.selected_option}
                      key={index}
                      value={gen}
                    >
                      {gen}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.mobile_category}>
              <label>Category:</label>
              <select
                className={styles.category_select}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {allCategories.map((cat, index) => {
                  return (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.mobile_clear_filters}>
            <button>
              <p>Clear</p>
              <CgClose size={35} />
            </button>
          </div>
        </div>
        <div
          className={styles.mobile_button}
          onClick={() => setMobileFilters(!mobileFilters)}
        >
          <h4>Filters</h4>
          <div>
            <IoMdArrowDropdown
              className={mobileFilters ? `${styles.arrow_active}` : ``}
              size={24}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
