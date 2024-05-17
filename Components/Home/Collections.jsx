import { BASE_URL } from "@/APiSetUp/axios";
import Link from "next/link";

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
              <div className="mainImg">
                <img
                  src="/images/product-frame.webp"
                  alt=""
                  className="subImage"
                />
                <img
                  src={BASE_URL + category1?.image}
                  alt=""
                  className="p-4 fr-img"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mainBox2">
              <div className="mainImg">
                <img
                  src="/images/product-frame.webp"
                  className="subImage"
                  alt=""
                />
                <img
                  src={BASE_URL + category2?.image}
                  alt=""
                  className="p-4 fr-img"
                />
              </div>
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
