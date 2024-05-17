import { BASE_URL } from "@/APiSetUp/axios";
import Link from "next/link";
import useCommonApi from "@/hooks/useCommonApi";
import { useEffect } from "react";

const WhyChoose = () => {
  const { footerData, getFooter } = useCommonApi();

  useEffect(() => {
    getFooter();
  }, [getFooter]);

  let phone1;

  const hasSlash = footerData?.phone_no?.includes("/");

  if (hasSlash) {
    // If there is a slash, split the phone number into two parts
    const parts = footerData?.phone_no?.split(" / ");
    phone1 = parts[0].trim(); // The first phone number
  } else {
    // If there is no slash, keep the original phone number
    phone1 = footerData?.phone_no?.trim();
  }
  return (
    <div className="choose-cont">
      <div className="chose-left">
        <div className="chose-left-cont">
          <h2>Contact us</h2>
          {phone1 && <Link href={`tel:${phone1}`}>{phone1}</Link>}
          <div className="email">
            <span>Email -</span>
            <Link href={`mailto:${footerData?.email}`}>
              {footerData?.email}
            </Link>
          </div>
        </div>
      </div>
      <div className="chose-right">
        <p>Why Choose us</p>
        <div className="chs-box">
          <div className="chs-item">
            <img src={BASE_URL + footerData?.image1} alt="item1" />
            <p>{footerData?.why_buy_point3}</p>
          </div>
          <div className="chs-item">
            <img src={BASE_URL + footerData?.image2} alt="item1" />
            <p>{footerData?.why_buy_point4}</p>
          </div>
          <div className="chs-item">
            <img src={BASE_URL + footerData?.image3} alt="item1" />
            <p>{footerData?.why_buy_point5}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
