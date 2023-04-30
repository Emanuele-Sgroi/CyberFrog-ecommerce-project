import { useState, useEffect } from "react";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import "./Slider.scss";
import { sliderData } from "./slider-data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 8000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="slider">
      <TiArrowLeftThick className="arrow prev" onClick={prevSlide} />
      <TiArrowRightThick className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, imageMobile, heading, description } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img
                  src={window.innerWidth < 700 ? imageMobile : image}
                  alt={heading}
                />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{description}</p>
                  <a href="#product">
                    <button className="orange_button slider_button">
                      {" "}
                      View products{" "}
                    </button>
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
