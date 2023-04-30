import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { MdFormatListBulleted } from "react-icons/md";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  SORT_PRODUCTS_BY_CATEGORY_AND_GENDER,
  FILTER_BY_CATEGORY_GENDER_AND_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";
import ProductFilter from "../productFilter/ProductFilter";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [category, setCategory] = useState("All");
  const [gender, setGender] = useState("All");
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const lastProduct = currentPage * productsPerPage;
  const firstProduct = lastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(firstProduct, lastProduct);

  useEffect(() => {
    dispatch(
      SORT_PRODUCTS_BY_CATEGORY_AND_GENDER({ products, sort, category, gender })
    );
  }, [dispatch, products, sort, category, gender]);

  useEffect(() => {
    dispatch(
      FILTER_BY_CATEGORY_GENDER_AND_SEARCH({
        products,
        search,
        category,
        gender,
      })
    );
  }, [dispatch, products, search, category, gender]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 800) {
        setGrid(true);
        setProductsPerPage(6);
      } else {
        setProductsPerPage(9);
      }
    }

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.shop_container}>
        <div className={styles.content_container}>
          <div className={styles.search_container}>
            <div className={styles.layout_icons}>
              <BsFillGridFill
                className={
                  grid
                    ? `${styles.grid_icon_active}`
                    : `${styles.grid_icon_not_active}`
                }
                size={27}
                onClick={() => setGrid(true)}
              />
              <MdFormatListBulleted
                className={
                  !grid
                    ? `${styles.list_icon_active}`
                    : `${styles.list_icon_not_active}`
                }
                size={29}
                onClick={() => setGrid(false)}
              />
              <p>
                <b>{filteredProducts.length}</b> Products found.
              </p>
            </div>
            <div className={styles.search_bar}>
              <Search
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className={styles.sort_container}>
              <label>Sort by:</label>
              <select
                className={styles.sort_select}
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
              </select>
            </div>
          </div>

          <div className={styles.filters_container}>
            <ProductFilter search={search} />
          </div>

          <div className={styles.products_container}>
            <div
              className={
                grid ? `${styles.products_grid}` : `${styles.no_display}`
              }
            >
              {products.length === 0 ? (
                <p>No product found.</p>
              ) : (
                <>
                  {currentProducts.map((item) => {
                    return (
                      <div className={styles.container_items} key={item.id}>
                        <ProductItem {...item} grid={grid} product={item} />
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <div
              className={
                !grid ? `${styles.products_list}` : `${styles.no_display}`
              }
            >
              {products.length === 0 ? (
                <p>No product found.</p>
              ) : (
                <>
                  {currentProducts.map((item) => {
                    return (
                      <div
                        className={styles.container_items_list}
                        key={item.id}
                      >
                        <ProductItem {...item} grid={grid} product={item} />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
