import { BASE_URL } from "@/APiSetUp/axios";
import Image from "next/image";
import Link from "next/link";
import ImageComponent from "../NextComponent/ImageComponent";

function Banner({ banner, imgUrl }) {
  return (
    <div>
      <section className="banner">
      <div className="banner-cont">
        <ImageComponent
          src={BASE_URL + imgUrl + banner?.image}
          fill={true}
          alt="banner"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
        </div>
        <div className="container-fluid">
          <div className="banner-text">
            <h1>{banner?.heading}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: banner?.description,
              }}
            />
            <Link href="/search-product">
              Shop Now 
              <Image src="/images/right-arrow-white.webp" alt="arrow" width={14} height={26}/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
