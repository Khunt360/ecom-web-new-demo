import React, { useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";
import { BASE_URL } from "@/APiSetUp/axios";
import {  useSelector } from "react-redux";
import { useRouter } from "next/router";
import useCommonApi from "@/hooks/useCommonApi";
import Image from "next/image";

const ProductCart = ({ item,addRemoveToWishlist }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const {
    addToCart,
  } = useCommonApi();
  const { count } = useSelector((state) => state.cart);
  return (
    <div className="filter-prod-cart">
      <Link href={`/product-details/${item?.slug}`} className="imageLink">
        <div>
          {item?.get_defult_image?.image && <Image
        loading='lazy'
        unoptimized  src={item?.get_defult_image?.image ? BASE_URL + "/" + item?.get_defult_image?.image : "/images/saree1.webp"} width="100%" height="auto" alt="filter" />}
        </div>
      </Link>
      <div className="prod-feature-icon">
        <div className={`e-commerce-features-btn ${count?.wish_product_id?.includes(item?.id?.toString()) ? "active" : ""}`} onClick={user ? () => addRemoveToWishlist(item?.id) : () => router.push("/login")}>
          <IoMdHeartEmpty fontSize={"24px"} />
        </div>
        <div className={`e-commerce-features-btn ${count?.cart_product_id?.includes(item?.id?.toString()) ? "active" : ""}`} onClick={() => addToCart(item?.id)}>
          <BsCart2 fontSize={"24px"} />
        </div>
      </div>
      <div className="prod-card-description">
        <h6>
          <Link href={`/product-details/${item?.slug}`}>{item?.title}</Link>
        </h6>
        <div className="prod-price">
          <p>{item?.get_product_ind_price?.after_discount_price !== item?.get_product_ind_price?.price ? `₹${item?.get_product_ind_price?.price}` : ``}</p>
          <p>₹{item?.get_product_ind_price?.after_discount_price}</p>
        </div>
        <p className="continue-btn">Continue to buy</p>
        <Image
        loading='lazy'
        unoptimized 
          style={{ filter: "invert(1)", width: "6px", height: "auto" }}
          src="/images/right-arrow-white.webp"
          alt=""
        />
      </div>
    </div>
  );
};

export default ProductCart;
