import React from "react";
import FormTitleSubTitle from "../Common/FormTitleSubTitle";
import UpcomingProductCard from "../Common/UpcomingProductCard";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});


const UpcomingProduct = ({data}) => {
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
        items: 3,
      },
    },
  };
  return (
    <section className="upcomingProduct up-home">
      <div className="container container-new">
        <FormTitleSubTitle
          title={"Recently added products"}
          // title={"Shop by Upcoming Products"}
          subTitle={
            "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt "
          }
        />
        {/* <div className="row">
          <div className="col-md-4"><UpcomingProductCard /></div>
          <div className="col-md-4"><UpcomingProductCard /></div>
          <div className="col-md-4"><UpcomingProductCard /></div>
        </div> */}
        {data?.length > 0 && <OwlCarousel
          className="owl-carousel owl-theme owl-product"
          {...owl_product}
        >
          {data?.map((item, i) => {
            return (
              <div className="item" key={i}>
                <UpcomingProductCard item={item} />
              </div>
            );
          })}
        </OwlCarousel>}
      </div>
    </section>
  );
};

export default UpcomingProduct;
