import React from "react";
import FormTitleSubTitle from "../Common/FormTitleSubTitle";
import dynamic from "next/dynamic";
import SellingProductCard from "../Common/SellingProduct";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});


const SellingProduct = ({data}) => {
  const owl_product = {
    loop: true,
    margin: 32,
    nav: true,
    dots: false,
    smartSpeed: 4000,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
        margin: 16,
      },
      1000: {
        items: 3.5,
      },
    },
  };
  return (
    <section className="sellingProduct">
      <div className="container-left">
        <FormTitleSubTitle
          title={"Best Selling Products"}
          subTitle={
            "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt "
          }
        />
        {data?.length>0 &&
        <OwlCarousel
          className="owl-carousel owl-theme owl-product"
          {...owl_product}
        >
          {data?.map((item, i) => {
            return (
              <div className="sellItem" key={i}>
                <SellingProductCard item={item} />
              </div>
            );
          })}
        </OwlCarousel>
        }
      </div>
    </section>
  );
};

export default SellingProduct;
