import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { BASE_URL } from "@/APiSetUp/axios";
import { RWebShare } from "react-web-share";

var settings = {
  vertical: true,
  slidesToShow: 7,
  nav: false,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        vertical: false,
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 480,
      settings: {
        vertical: false,
        slidesToShow: 3,
      },
    },
  ],
};
var settings2 = {
  vertical: true,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        vertical: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        vertical: false,
      },
    },
  ],
};
function ProductSlider({ images, product }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <div className="slider-container prod-details-container">
      <div className="row align-items-stretch">
        <div className="col-xs-12 col-md-12 col-lg-12 col-xl-2 h-100 order-2 order-xl-1">
          <Slider
            asNavFor={nav1}
            ref={(slider) => (sliderRef2 = slider)}
            swipeToSlide={true}
            focusOnSelect={true}
            {...settings}
            className="thumbnail"
          >
            {/* <img src="/images/product1.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" />
                        <img src="/images/product3.webp" alt="product" />
                        <img src="/images/product1.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" />
                        <img src="/images/product3.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" />
                        <img src="/images/product1.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" />
                        <img src="/images/product3.webp" alt="product" />
                        <img src="/images/product1.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" />
                        <img src="/images/product3.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" /> */}
            {images?.map((item, index) => {
              return (
                <img
                  src={BASE_URL + "/" + item?.image}
                  alt="product"
                  key={index}
                />
              );
            })}
          </Slider>
        </div>
        <div className="col-xs-12 col-md-10 h-100 order-1 order-xl-2 position-relative">
          <RWebShare
            data={{
              text: product?.title,
              url: typeof window !== "undefined" && window.location.href,
              title:product?.title,
            }}
          >
            <span className="share-ico">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 6.66669C16.3807 6.66669 17.5 5.5474 17.5 4.16669C17.5 2.78598 16.3807 1.66669 15 1.66669C13.6193 1.66669 12.5 2.78598 12.5 4.16669C12.5 5.5474 13.6193 6.66669 15 6.66669Z"
                  stroke="#727070"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 12.5C6.38071 12.5 7.5 11.3807 7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5Z"
                  stroke="#727070"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 18.3333C16.3807 18.3333 17.5 17.214 17.5 15.8333C17.5 14.4526 16.3807 13.3333 15 13.3333C13.6193 13.3333 12.5 14.4526 12.5 15.8333C12.5 17.214 13.6193 18.3333 15 18.3333Z"
                  stroke="#727070"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.1582 11.2584L12.8499 14.575"
                  stroke="#727070"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.8415 5.42499L7.1582 8.74165"
                  stroke="#727070"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </RWebShare>
          <Slider
            asNavFor={nav2}
            ref={(slider) => (sliderRef1 = slider)}
            {...settings2}
            className="main-slider"
          >
            {/* <img src="/images/product1.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" />
                        <img src="/images/product3.webp" alt="product" />
                        <img src="/images/product1.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" />
                        <img src="/images/product3.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" />
                        <img src="/images/product1.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" />
                        <img src="/images/product3.webp" alt="product" />
                        <img src="/images/product1.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" />
                        <img src="/images/product3.webp" alt="product" />
                        <img src="/images/product2.webp" alt="product" /> */}
            {images?.map((item, index) => {
              return (
                <img
                  src={BASE_URL + "/" + item?.image}
                  alt="product"
                  key={index}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default ProductSlider;
