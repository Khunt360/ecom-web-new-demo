import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";
import { BASE_URL } from "@/APiSetUp/axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useCommonApi from "@/hooks/useCommonApi";
import Image from "next/image";

const SellingProductCard = ({ item }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const { addToCart } = useCommonApi();
  const { count } = useSelector((state) => state.cart);

  return (
    <div className="sellingProductCard">
      <div className="productImg">
      <Link href={`/product-details/${item?.slug}`} className="pro-img-cont">
        {item?.get_defult_image?.image && <Image
        loading='lazy'
        unoptimized 
          src={
            item?.get_defult_image?.image
              ? BASE_URL + "/" + item?.get_defult_image?.image
              : "/images/saree1.webp"
          }
          alt="product"
        />}
        </Link>
        <div className="sellingProductContent rounded ">
          <div className="mainContent">
            <h4>
              {item?.title?.length > 31
                ? item?.title?.substr(0, 30) + "..."
                : item?.title}
            </h4>
            <div className="price">
              <h6>
                <span>
                  {item?.get_product_ind_price?.after_discount_price !==
                  item?.get_product_ind_price?.price
                    ? `₹ ${item?.get_product_ind_price?.price}`
                    : ``}
                </span>
                &nbsp; ₹ {item?.get_product_ind_price?.after_discount_price}
              </h6>
            </div>
          </div>
          <div className="buyBtnDiv">
            <button className="btn btn-md btn-dark rounded-1 continueBtn">
              <Link href={`/product-details/${item?.slug}`} style={{color:"inherit"}}>View Details</Link>
            </button>
            <div className="d-flex">
              <button
                className={`btn btn-md rounded-1 border icon-prod ${
                  count?.wish_product_id?.includes(item?.id?.toString())
                    ? "active"
                    : ""
                }`}
                onClick={
                  user
                    ? () => addRemoveToWishlist(item?.id)
                    : () => router.push("/login")
                }
              >
                <IoMdHeartEmpty fontSize={"24px"} />
              </button>
              <button
                className={`btn btn-md rounded-1 border icon-prod ms-2 ${
                  count?.cart_product_id?.includes(item?.id?.toString())
                    ? "active"
                    : ""
                }`}
                onClick={() => addToCart(item?.id)}
              >
                <BsCart2 fontSize={"24px"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellingProductCard;
