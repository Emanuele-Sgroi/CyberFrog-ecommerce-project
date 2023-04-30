import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;
  // Limit the page Numbers shown
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 501) {
        setmaxPageNumberLimit(2);
        setPageNumberLimit(2);
      } else {
        setmaxPageNumberLimit(5);
        setPageNumberLimit(5);
      }
    }

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // GO to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    // Show next set of pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // GO to prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    // Show prev set of pageNumbers
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  // console.log(pageNumbers);

  return (
    <ul className={styles.pagination}>
      <p className={styles.pagination_text}>
        {" "}
        Page
        <b className={styles.page}>{`${currentPage}`}</b>
        <span>{`of`}</span>
        <b>{`${Math.ceil(totalPages)}`}&nbsp;</b>
      </p>
      <li
        onClick={currentPage === 1 ? "" : paginatePrev}
        className={
          currentPage === pageNumbers[0]
            ? `${styles.unavailable}`
            : `${styles.available}`
        }
      >
        <FaLessThan />
      </li>

      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={
                currentPage === number
                  ? `${styles.active}`
                  : `${styles.not_active}`
              }
            >
              {number}
            </li>
          );
        }
      })}

      <li
        onClick={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? ""
            : paginateNext
        }
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${styles.unavailable}`
            : `${styles.available}`
        }
      >
        <FaGreaterThan />
      </li>
    </ul>
  );
};

export default Pagination;
