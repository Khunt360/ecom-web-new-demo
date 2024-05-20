import Banner from "@/Components/Home/Banner";
import FounderInfo from "@/Components/Home/FounderInfo";
import Collections from "@/Components/Home/Collections";
import TradingCollections from "@/Components/Home/TradingCollections";
import UpcomingProduct from "@/Components/Home/UpcomingProduct";
import ContactUs from "@/Components/Home/ContactUs";
import WhyChoose from "@/Components/Home/WhyChoose";
import ClientTestimonial from "@/Components/Home/ClientTestimonial";
import SellingProduct from "@/Components/Home/SellingProduct";
import axios from "@/APiSetUp/axios";
// import { useEffect } from "react";
import SEOPart from "@/Components/SEOPart";
import { SeoData } from "@/SEOData/SeoData";

function Home({ homeData, bestSellingData }) {

  return (
    <>
      <SEOPart
        data={SeoData?.home}
        seo={homeData?.seo}
        imgUrl={homeData?.image}
        image={homeData?.banner?.[1]?.image}
      />
      <Banner banner={homeData?.banner?.[1]} imgUrl={homeData?.image} />
      <FounderInfo
        heading={homeData?.home?.heading_1}
        subheading={homeData?.home?.sub_heading_1}
        sign={homeData?.home?.founder_image}
        name={homeData?.home?.founder_name}
      />
      <Collections
        category1={homeData?.category_list?.[0]}
        category2={homeData?.category_list?.[1]}
      />
      <TradingCollections
        heading={homeData?.home?.heading_2}
        subheading={homeData?.home?.sub_heading_2}
      />
      <UpcomingProduct data={homeData?.recently_added} />
      <ContactUs
        heading={homeData?.home?.heading_3}
        subheading={homeData?.home?.sub_heading_3}
      />
      <SellingProduct data={bestSellingData} />
      <ClientTestimonial
        image={homeData?.home?.client_image}
        testimonial={homeData?.clients_say}
      />
      <WhyChoose />
    </>
  );
}

export default Home;

export async function getServerSideProps() {
  try {
    // Fetch home data and best-selling data concurrently using Promise.all
    const [homeResponse, bestSellingResponse] = await Promise.all([
      axios.post("get-home-content"),
      axios.get("best-sellers"),
    ]);

    // Extract data from the responses
    const homeData = homeResponse.data.result;
    const bestSellingData = bestSellingResponse.data.best_sellers;

    // Return the data as props
    return {
      props: {
        homeData,
        bestSellingData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        homeData: null, // Return null if there's an error
        bestSellingData: null, // Return null if there's an error
      },
    };
  }
}
