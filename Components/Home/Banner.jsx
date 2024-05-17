import { BASE_URL } from "@/APiSetUp/axios";
import Link from "next/link";

function Banner({ banner, imgUrl }) {
  return (
    <div>
      <section className="banner">
        <img
          src={BASE_URL + imgUrl + banner?.image}
          width={"100%"}
          height={"auto"}
          alt="banner"
          className="banner-homepage"
        />

        <div className="container-fluid">
          <div className="banner-text">
            <h1>{banner?.heading}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: banner?.description,
              }}
            />
            <Link href="/search-product">
              Shop Now <img src="/images/right-arrow-white.webp" alt="" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
