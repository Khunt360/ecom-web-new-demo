import CommonBanner from "@/Components/Common/CommonBanner";
import WhyChoose from "@/Components/Home/WhyChoose";
import axios, { BASE_URL } from "@/APiSetUp/axios";
// import { useEffect } from "react";
import SEOPart from "@/Components/SEOPart";
import { SeoData } from "@/SEOData/SeoData";
import { useRouter } from "next/router";

const AboutUs = ({ data }) => {
  const router = useRouter();

  const AboutServivesData = data?.about_us?.slice(0, 4);
  const AboutPurposeData = [
    {
      icon: "images/mission.webp",
      title: data?.about_us?.[6]?.title,
      desc: data?.about_us?.[6]?.description,
    },
    {
      icon: "images/vision.webp",
      title: data?.about_us?.[7]?.title,
      desc: data?.about_us?.[7]?.description,
    },
    {
      icon: "images/Goal.webp",
      title: data?.about_us?.[8]?.title,
      desc: data?.about_us?.[8]?.description,
    },
  ];

  return (
    <>
      <SEOPart
        data={SeoData?.about}
        imgUrl={data?.image}
        seo={data?.seo}
        image={data?.banner?.image}
      />
      <CommonBanner
        img={data?.banner?.image}
        imgUrl={data?.image}
        title={data?.banner?.heading}
        desc={data?.banner?.description}
        // link="easybuy@gmail.com"
      />
      <div className="about-us-content">
        <div className="container container-new">
          <div className="shade-title justify-content-center">
            <h2>
              {data?.page_heading?.page_heading?.split(" ")[0]}
              <span> {data?.page_heading?.page_heading?.split(" ")[1]}</span>
            </h2>
          </div>
          <p className="about-us-description">{data?.page_heading?.section}</p>
          <div className="row">
            {AboutServivesData?.map((item) => (
              <div className="col-md-3 col-sm-6" key={item.id}>
                <div className="about-service-box">
                  <h4>{item.description}</h4>
                  <h6>{item.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-contact">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-12">
              <div className="about-contact-des">
                <h2>{data?.about_us?.[4]?.title}</h2>
                <p>{data?.about_us?.[4]?.description}</p>
                <button onClick={() => router.push("/contact-us")}>
                  Contact us
                </button>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7 col-md-12">
              <img
                width={"100%"}
                height={"100%"}
                src={BASE_URL + data?.about_us?.[4]?.file}
                alt="side banner"
              />
            </div>
          </div>
        </div>
        <div className="about-caption">
          <div className="container container-about-caption">
            <h2>{data?.about_us?.[5]?.title}</h2>
            <p className="about-us-description">
              {data?.about_us?.[5]?.description}
            </p>
            <div className="row purpose-about">
              {AboutPurposeData.map((item) => (
                <div className="col-md-4" key={item.id}>
                  <div className="">
                    <img src={item.icon} alt="icon" />
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="col-md-12">
                <button onClick={() => router.push("/search-product")}>
                  Shop 24/7
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="about-client-scale">
          <div className="container container-new">
            <div className="row">
              <div className="col-md-6">
                <h2>{data?.about_us?.[9]?.title}</h2>
                <p>{data?.about_us?.[9]?.description}</p>
              </div>
              <div className="col-md-6">
                <h6>{data?.about_us?.[10]?.title}</h6>
                <div className="d-flex align-items-center gap-3">
                  <div
                    class="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={data?.about_us?.[10]?.description}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      class="progress-bar"
                      style={{ width: `${data?.about_us?.[10]?.description}%` }}
                    ></div>
                  </div>
                  <h5>{data?.about_us?.[10]?.description}%</h5>
                </div>
                <h6>Price</h6>
                <div className="d-flex align-items-center gap-3">
                  <div
                    class="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={data?.about_us?.[11]?.description}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      class="progress-bar"
                      style={{ width: `${data?.about_us?.[11]?.description}%` }}
                    ></div>
                  </div>
                  <h5>{data?.about_us?.[11]?.description}%</h5>
                </div>
                <h6>Genuine Products</h6>
                <div className="d-flex align-items-center gap-3">
                  <div
                    class="progress"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={data?.about_us?.[12]?.description}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      class="progress-bar"
                      style={{ width: `${data?.about_us?.[12]?.description}%` }}
                    ></div>
                  </div>
                  <h5>{data?.about_us?.[12]?.description}%</h5>
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

export default AboutUs;

export async function getServerSideProps() {
  try {
    const response = await axios.post("about-us");

    if (response && response.data) {
      const data = response?.data?.result;

      // Return the data as props
      return {
        props: {
          data,
        },
      };
    } else {
      // Handle the case where the response or product data is not available
      return {
        notFound: true, // Return a 404 page
      };
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    return {
      props: {
        data: null, // Return null if there's an error
      },
    };
  }
}
