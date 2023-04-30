import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <section className={styles.notFound_container}>
      <div className={styles["not-found"]}>
        <div>
          <h2>404</h2>
          <p>Opppppsss, page not found.</p>
          <button className="--btn">
            <Link to="/">&larr; Back To Home</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
