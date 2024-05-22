import { AiOutlineClose } from "react-icons/ai";
import ButtonOutlined from "./ButtonOutlined";
import Link from "next/link";
import { BASE_URL } from "@/APiSetUp/axios";
import ImageComponent from "../NextComponent/ImageComponent";

const UpcomingProductCard = ({ item,addRemoveToWishlist, isWishlist, slNo }) => {
  // const {addRemoveToWishlist} = useCommonApi();

  return (
    <div className="upcomingProductCard">
      <div className="productImg">
        <div className="image-prod-title-position">
          <Link href={`/product-details/${item?.slug}`} className="with-gradient">
            {/* <img
              src={
                item?.get_defult_image?.image
                  ? BASE_URL + "/" + item?.get_defult_image?.image
                  : "/images/saree1.webp"
              }
              alt="product"
            /> */}
            <div className="up-prod-img">
            <ImageComponent
              src={
                item?.get_defult_image?.image
                  ? BASE_URL + "/" + item?.get_defult_image?.image
                  : "/images/saree1.webp"
              }
              alt="product"
              fill
            />
            </div>
          </Link>
          <Link href={`/product-details/${item?.slug}`}>
            <h4>{item?.title?.length > 26
              ? item?.title?.substr(0, 25) + "..."
              : item?.title}</h4>
          </Link>
          <div className="border">-</div>
        </div>
        <div className="pro-position-cart">
          {isWishlist && (
            <div className="closeIcon" onClick={() => {addRemoveToWishlist(item?.id)}}>
              <AiOutlineClose fontSize="18px" />
            </div>
          )}

          <span>
            {item?.description?.length > 61
              ? item?.description.substr(0, 60) + "..."
              : item?.description}
          </span>
          <div className="price">
            <h6>
              <span>
                {item?.get_product_ind_price?.after_discount_price !==
                item?.get_product_ind_price?.price
                  ? `₹ ${item?.get_product_ind_price?.price}`
                  : ``}
              </span>
              &nbsp;₹ {item?.get_product_ind_price?.after_discount_price}
            </h6>
          </div>
          <ButtonOutlined text={"Continue to Buy"} id={item?.id}/>
        </div>
      </div>
      {/* <button className=''>
                Continue to Buy
            </button> */}
    </div>
  );
};

export default UpcomingProductCard;
