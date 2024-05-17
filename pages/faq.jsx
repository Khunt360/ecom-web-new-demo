import CommonBanner from "@/Components/Common/CommonBanner";
import WhyChoose from "@/Components/Home/WhyChoose";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toggleLoader } from "@/redux/userSlice";
import { toast } from "react-toastify";
import axios from "@/APiSetUp/axios";
import { useCallback, useEffect, useState } from "react";
import NodataFound from "@/Components/NodataFound";
import SEOPart from "@/Components/SEOPart";
import { SeoData } from "@/SEOData/SeoData";

const Faq = () => {
  const dispatch = useDispatch();
  const [faqData, setFaqData] = useState([]);
  const [param, setParam] = useState("ALL");
  const [banner, setBanner] = useState();
  const menulist = [
    // "Popular Questions",
    // "Shipping",
    // "Orders",
    // "Returns",
    // "Billing",
    // "Warranty",
    // "Product Information",
    // "Product Maintenance",
    // "Account",
    // "Help",
    {
      name: "All",
      value: "ALL",
    },
    {
      name: "Our Jewelry",
      value: "OJ",
    },
    {
      name: "Payment & Shipping",
      value: "PS",
    },
    {
      name: "Returns & Exchanges",
      value: "RE",
    },
  ];
  // const data = [
  //   {
  //     title:
  //       "Caption for question ipsum dolor sit amet the consectetur it incididunt? ",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eiusmod Lorem ipsum dolor sit amet, adipiscing eiusmod tempor incididunt laibore tempor laibore",
  //   },
  //   {
  //     title: "Question ipsum dolor sit amet the it incididunt ",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eiusmod Lorem ipsum dolor sit amet, adipiscing eiusmod tempor incididunt laibore tempor laibore",
  //   },
  //   {
  //     title: "Caption for question ipsum dolor sit amet the consectetur? ",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eiusmod Lorem ipsum dolor sit amet, adipiscing eiusmod tempor incididunt laibore tempor laibore",
  //   },
  //   {
  //     title: "Question ipsum the it incididunt ",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eiusmod Lorem ipsum dolor sit amet, adipiscing eiusmod tempor incididunt laibore tempor laibore",
  //   },
  //   {
  //     title:
  //       "Lorem ipsum dolor sit amet the consectetur it adipiscing the eiusmod tempor the? ",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eiusmod Lorem ipsum dolor sit amet, adipiscing eiusmod tempor incididunt laibore tempor laibore",
  //   },
  //   {
  //     title: "Some caption for question ipsum dolor sit amet the consectetur? ",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eiusmod Lorem ipsum dolor sit amet, adipiscing eiusmod tempor incididunt laibore tempor laibore",
  //   },
  //   {
  //     title: "Question ipsum dolor sit amet the it incididunt ",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing eiusmod Lorem ipsum dolor sit amet, adipiscing eiusmod tempor incididunt laibore tempor laibore",
  //   },
  // ];
  const getFaqList = useCallback(
    (p) => {
      const data = {
        params: {
          type: p,
        },
      };
      dispatch(toggleLoader());
      axios.post("faq-list", data).then((res) => {
        dispatch(toggleLoader());
        if (res?.data?.result) {
          setFaqData(res?.data?.result?.faq);
          setBanner(res?.data?.result);
        } else if (res?.data?.error) {
          toast.error(res?.data?.error?.meaning);
          window.scrollTo(0, 0);
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    getFaqList(param);
  }, [getFaqList, param]);

  return (
    <>
      <SEOPart
        data={SeoData?.faq}
        imgUrl={banner?.image}
        image={banner?.banner?.image}
      />
      <CommonBanner
        img={banner?.banner?.image}
        imgUrl={banner?.image}
        title={banner?.banner?.heading}
        desc={banner?.banner?.description}
        // link="easybuy@gmail.com"
      />
      <div className="faq">
        <div className="container container-new">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-4 col-xl-3">
              <div className="faq-left">
                <ul>
                  {menulist?.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link
                          href="#"
                          className={item?.value === param ? "active" : ""}
                          onClick={(e) => {
                            e.preventDefault();
                            setParam(item?.value);
                          }}
                        >
                          {item?.name}
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19"
                              stroke="#E9332B"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 5L19 12L12 19"
                              stroke="#E9332B"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-8 col-xl-7">
              <div className="faq-right">
                <h2>Popular Questions</h2>
                <div className="faq-inner">
                  {faqData?.length > 0 ? (
                    <div className="accordion" id="accordionExample">
                      {faqData?.map((item, index) => {
                        return (
                          <div className="accordion-item" key={index}>
                            <h3
                              className="accordion-header"
                              id={`heading${index + 1}`}
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index + 1}`}
                                aria-expanded="true"
                                aria-controls={`collapse${index + 1}`}
                              >
                                {item?.question}
                              </button>
                            </h3>
                            <div
                              id={`collapse${index + 1}`}
                              className="accordion-collapse collapse"
                              aria-labelledby={`heading${index + 1}`}
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                {item?.answer}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <NodataFound msg="No faq's found!" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhyChoose />
    </>
  );
};

export default Faq;
