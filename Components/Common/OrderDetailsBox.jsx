import { BASE_URL } from "@/APiSetUp/axios";

const OrderDetailsBox = ({ data }) => {
  return (
    <div className="order-box">
      <div className="order-img">
        <img
          src={
            BASE_URL +
            "/" +
            data?.get_product_details
              ?.get_all_image?.[0]?.image
          }
          alt="order"
        />
      </div>
      <div className="order-det">
        <div className="order-det-top">
          <div className="det-top-left">
            <h2>
              {data?.get_product_details?.title
                ?.length > 51
                ? data?.get_product_details?.title?.substr(
                    0,
                    50
                  ) + "..."
                : data?.get_product_details?.title}
            </h2>
            <p>&nbsp;</p>
            {/* <p>Color : {data?.color}</p> */}
            <div className="d-flex">
              <span>Qty : {data?.qty}</span>
                <h5>Unit Price : Rs. {data?.unit_price_original}</h5>
            </div>
          </div>
          <div className="det-top-right">
            <h3>
              Order Total : <span>Rs. {data?.total_price}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsBox;
