import React from "react";
import styles from "./InfoBox.module.scss";

const InfoBox = ({ infoBoxClass, title, count, icon }) => {
  return (
    <div className={styles["info-box"]}>
      <div className={infoBoxClass}>
        <div className={styles.text}>
          <h4>{title}</h4>
          <h3>{count}</h3>
        </div>
        {icon}
      </div>
    </div>
  );
};

export default InfoBox;
