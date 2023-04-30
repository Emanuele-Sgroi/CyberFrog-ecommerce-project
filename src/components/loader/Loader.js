import ReactDOM from "react-dom";
import { images } from "../../constants";
import styles from "./Loader.module.scss";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={images.loader} alt="Loading, please wait" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
