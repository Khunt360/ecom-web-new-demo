import { BASE_URL } from "@/APiSetUp/axios";
import Image from "next/image";
import Link from "next/link";

function Banner({ banner, imgUrl }) {
  return (
    <div>
      <section className="banner">
      {banner?.image && <Image
        loading='lazy'
        unoptimized 
          src={BASE_URL + imgUrl + banner?.image}
          width={15} height={15} 
          alt="banner"
          className="banner-homepage"
          
        />}

        <div className="container-fluid">
          <div className="banner-text">
            <h1>{banner?.heading}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: banner?.description,
              }}
            />
            <Link href="/search-product">
              Shop Now <Image
        loading='lazy'
        unoptimized  src="/images/right-arrow-white.webp" alt="" width={15} height={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
