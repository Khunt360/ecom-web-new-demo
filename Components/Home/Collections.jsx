import { BASE_URL } from "@/APiSetUp/axios";
import Link from "next/link";
import ImageComponent from "../NextComponent/ImageComponent";
import Image from "next/image";

const Collections = ({ category1, category2 }) => {
  return (
    <section className="collections">
      <div className="container container-new">
        <div className="row">
          <div className="col-md-6 ">
            <div className="mainBox">
              <div className="content">
                <h3>{category1?.name}</h3>
                <span>{category1?.description}</span>
              </div>
              <Link href={`/search-product?categoryId=${category1?.id}`}>
                shop now
              </Link>
              {category1?.image && (
                <div className="mainImg">
                  <Image
                    src="/images/product-frame.webp"
                    alt="frame"
                    className="subImage"
                    width={626}
                    height={767}
                  />
                  <div className="p-4 fr-img">
                    <ImageComponent
                      src={BASE_URL + category1?.image}
                      alt="product"
                      fill
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mainBox2">
              {category2?.image && (
                <div className="mainImg">
                  <Image
                    src="/images/product-frame.webp"
                    className="subImage"
                    alt="frame"
                    width={626}
                    height={767}
                  />
                  <div className="p-4 fr-img">
                    <ImageComponent
                      src={BASE_URL + category2?.image}
                      alt="product"
                      fill
                    />
                  </div>
                </div>
              )}
              <div className="content">
                <h3>{category2?.name}</h3>
                <span>{category2?.description}</span>
              </div>
              <Link href={`/search-product?categoryId=${category2?.id}`}>
                shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
