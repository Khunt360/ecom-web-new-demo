import Link from "next/link";
import dateFormat from "dateformat";
import { BASE_URL } from "@/APiSetUp/axios";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { toggleLoader } from "@/redux/userSlice";
import { toast } from "react-toastify";
import axios from "@/APiSetUp/axios";
import Image from "next/image";

const OrderBox = ({ data, setOrderData }) => {
  const dispatch = useDispatch();
  const CancelOrder = (id) => {
    var data = {
      params: {
        order_master_id: id,
      },
    };
    swal({
      text: "Are you sure you want to cancel this order?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
      className: "war005",
    }).then((isConfirmed) => {
      if (isConfirmed) {
        dispatch(toggleLoader());
        axios.post("cancel-order", data).then((res) => {
          dispatch(toggleLoader());
          if (res.data) {
            setOrderData(res?.data?.orderlist);
            toast.success(res?.data?.success);
            window.scrollTo(0, 0);
          } else if (res?.data?.error) {
            toast.error(res?.data?.error?.meaning);
            window.scrollTo(0, 0);
          }
        });
      }
    });
  };
  return (
    <div className="order-box">
      <div className="order-img">
        {data?.get_order_details?.[0]?.get_product_details
              ?.get_all_image?.[0]?.image && <Image
        loading='lazy'
        unoptimized 
          src={
            BASE_URL +
            "/" +
            data?.get_order_details?.[0]?.get_product_details
              ?.get_all_image?.[0]?.image
          }
          alt="order"
        />}
      </div>
      <div className="order-det">
        <div className="order-det-top">
          <div className="det-top-left">
            <Link href={`order-details/${data?.id}`}>
              <h2>
                {data?.get_order_details?.[0]?.get_product_details?.title
                  ?.length > 51
                  ? data?.get_order_details?.[0]?.get_product_details?.title?.substr(
                      0,
                      50
                    ) + "..."
                  : data?.get_order_details?.[0]?.get_product_details?.title}
              </h2>
            </Link>
            <p>&nbsp;</p>
            {/* <p>Color : {data?.color}</p> */}
            <div className="d-flex">
              <span>Qty : {data?.total_item}</span>
            </div>
          </div>
          <div className="det-top-right">
            <h3>
              Order Total : <span>Rs. {data?.total_after_discount}</span>
            </h3>
            <p>
              Status :
              <span
                className={
                  data.status === "I"
                    ? "stat-yellow"
                    : data.status === "N"
                    ? "stat-green"
                    : "stat-red"
                }
              >
                {data.status === "I" && (
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_223_2)">
                      <path
                        d="M18.9926 4.14291V8.89291H14.2426"
                        stroke="#FFD700"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.0054 12.8512C16.4908 14.3078 15.5167 15.5577 14.23 16.4126C12.9432 17.2674 11.4134 17.6809 9.87125 17.5906C8.32905 17.5004 6.85795 16.9114 5.67964 15.9124C4.50132 14.9133 3.67963 13.5584 3.33837 12.0517C2.99712 10.545 3.15479 8.96827 3.78764 7.55901C4.42049 6.14975 5.49422 4.98435 6.84703 4.23842C8.19984 3.49249 9.75844 3.20645 11.288 3.4234C12.8175 3.64035 14.2351 4.34854 15.3271 5.44125L18.9925 8.89291"
                        stroke="#FFD700"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </svg>
                )}
                {data.status === "N" && (
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.8346 4.75L7.1263 13.4583L3.16797 9.5"
                      stroke="#2E9F52"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
                {data.status === "C" && (
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.25 4.75L4.75 14.25"
                      stroke="#CB231C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.75 4.75L14.25 14.25"
                      stroke="#CB231C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                )}
                {data.status === "I"
                  ? "Initiated"
                  : data.status === "N"
                  ? "Delivered"
                  : data.status === "C"
                  ? "Canceled"
                  : "Failed"}
              </span>
            </p>
          </div>
        </div>
        <div className="order-det-bot">
          <h4>
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0417 3.16669H3.95833C3.08388 3.16669 2.375 3.87557 2.375 4.75002V15.8334C2.375 16.7078 3.08388 17.4167 3.95833 17.4167H15.0417C15.9161 17.4167 16.625 16.7078 16.625 15.8334V4.75002C16.625 3.87557 15.9161 3.16669 15.0417 3.16669Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.668 1.58331V4.74998"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.33203 1.58331V4.74998"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.375 7.91669H16.625"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Ordered On : {dateFormat(data?.order_date, "dd/mm/yyyy")}
          </h4>
          <div className="order-det-right">
            <h5>Order Id : {data?.order_number}</h5> <div>
              <a className="stat-red" onClick={() => CancelOrder(data?.id)}>
                Cancel
              </a>
              <Link href={`order-details/${data?.id}`}>View Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBox;
