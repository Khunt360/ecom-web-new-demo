import { BASE_URL } from "@/APiSetUp/axios";
import { AiOutlineDelete } from "react-icons/ai";
import ProductCounter from "./ProductCounter";
import useCommonApi from "@/hooks/useCommonApi";

const CartItemBox = ({ data, isDelete, isQtyFixed, removeItem }) => {
  return (
    <>
      <div className="cart-box">
        <div className="cart-img">
          <img src={data?.get_product_details?.get_all_image?.[0]?.image ? BASE_URL + "/" + data?.get_product_details?.get_all_image?.[0]?.image : "/images/pic1.webp"} alt="order" />
        </div>
        <div className="order-det">
          <div className="det-top-left">
            <div className="cart-content">
              <h2>{data?.get_product_details?.title
                ?.length > 51
                ? data?.get_product_details?.title?.substr(
                    0,
                    50
                  ) + "..."
                : data?.get_product_details?.title}</h2>
              <div style={{width:"20px",height:"20px"}}>
              {isDelete && <AiOutlineDelete size={20} color="#87919A" onClick={() => removeItem(data?.id)} />}
              </div>
            </div>
            {/* <p>Color : {data?.color}</p> */}
            <div className="cart-content align-items-center">
              {isQtyFixed ? (
                <div className="qty">Qty : {data?.qty}</div>
              ) : (
                <ProductCounter qty={data?.qty} product={data}/>
              )}
              <h5 className="price">Rs. {data?.total_price}</h5>
            </div>
          </div>
        </div>
        <div className="cart-det-top"></div>
      </div>
    </>
  );
};

export default CartItemBox;
