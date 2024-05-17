import React, { useEffect, useState } from "react";
import CommonBanner from "@/Components/Common/CommonBanner";
import WhyChoose from "@/Components/Home/WhyChoose";
import Card from "@/Components/Testimonial/Card";
import { useDispatch } from "react-redux";
import { toggleLoader } from "@/redux/userSlice";
import axios from "@/APiSetUp/axios";
import SEOPart from "@/Components/SEOPart";
import { SeoData } from "@/SEOData/SeoData";
import NodataFound from "@/Components/NodataFound";

const Testimonial = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const body = {
      params: {
        page_no: page,
        per_page: "6",
      },
    };
    dispatch(toggleLoader());
    axios
      .post("/testimonials", body)
      .then((res) => {
        setDataList([...dataList, ...res.data.details]);
        setData(res?.data);
      })
      .finally(() => {
        dispatch(toggleLoader());
      });
  }, [page]);

  return (
    <>
      <SEOPart
        data={SeoData?.testi}
        imgUrl={data?.banner_path}
        image={data?.banner?.image}
      />
      <CommonBanner
        img={data?.banner?.image}
        imgUrl={data?.banner_path}
        title={data?.banner?.heading}
        desc={data?.banner?.description}
        // link="easybuy@gmail.com"
      />
      {dataList?.length > 0 ? (
        <div className="testimonial-bg">
          <div className="testimonial-right-bg">
            <img src="/images/testimonial-right-bg.webp" alt="" />
          </div>
          <div className="container">
            <div className="row ">
              {dataList?.map((ele, i) => {
                return (
                  <div className="col-md-6 card-main" key={i}>
                    <Card data={ele} image_path={data?.image_path} />
                  </div>
                );
              })}
              {dataList?.length !== data?.testimonial_count && (
                <div className="load-butto">
                  <a onClick={() => setPage(page + 1)}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2V6"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 18V22"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.92969 4.92999L7.75969 7.75999"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.2383 16.24L19.0683 19.07"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2 12H6"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 12H22"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.92969 19.07L7.75969 16.24"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.2383 7.75999L19.0683 4.92999"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Load more
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <NodataFound msg="No Data Found" />
      )}
      <WhyChoose />
    </>
  );
};

export default Testimonial;
