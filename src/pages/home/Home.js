import React, { useEffect } from "react";
import "./Home.scss";
import Slider from "../../components/slider/Slider";
import Product from "../../components/product/Product";

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 900,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProducts();
  }, [url]);
  return (
    <div className="home">
      <Slider />
      <div className="shop" id="product">
        <Product />
      </div>
    </div>
  );
};

export default Home;
