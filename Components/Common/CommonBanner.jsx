import { BASE_URL } from "@/APiSetUp/axios";
import Image from "next/image";

const CommonBanner = ({ img, imgUrl, title, desc, link, linkTitle }) => {
  return (
    <div className="comm-banner">
      <Image
        loading='lazy'
        unoptimized  src={BASE_URL+imgUrl+img} alt="contact" />
      <div className="container">
        <div className="ban-text">
          <h1>{title}</h1>
          {/* <p>
            {desc}
            <span>{linkTitle}{link}</span>
          </p> */}
          <div
              dangerouslySetInnerHTML={{
                __html: desc,
              }}
            />
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
