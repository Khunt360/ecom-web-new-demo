import ProfileLayout from "@/Components/ProfileLayout";
import Head from "next/head";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleLoader } from "@/redux/userSlice";
import { toast } from "react-toastify";
import axios from "@/APiSetUp/axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import dateFormat from "dateformat";
import userRoutes from "@/Components/Routes/UserRoutes";
import OrderDetailsBox from "@/Components/Common/OrderDetailsBox";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [orderData, setOrderData] = useState([]);

  const getOrder = useCallback(
    (id) => {
      const data = {
        params: {
          order_master_id: id,
        },
      };
      dispatch(toggleLoader());
      axios.post("get-order-details", data).then((res) => {
        dispatch(toggleLoader());
        if (res?.data) {
          setOrderData(res?.data?.orderDetails);
        } else if (res?.data?.error) {
          toast.error(res?.data?.error?.meaning);
          window.scrollTo(0, 0);
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (router?.query?.id) {
      getOrder(router?.query?.id);
    }
  }, [getOrder, router?.query?.id]);

  return (
    <>
      <Head>
        <title>Orders Details || Fast Buy</title>
        <meta name="description" content="Order Details || Fast Buy"></meta>
      </Head>
      <ProfileLayout>
        <div className="addressLayout">
          <div className="addressLayoutHead">
            <h1>Order Details</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <Link href="/my-orders">
              <MdKeyboardArrowLeft fontSize={"32px"} />
              Back
            </Link>
          </div>
          <div className="ship-bill-sec">
            <div className="row">
              <div className="col-12 col-md-6">
                <h3>Shipping Details</h3>
                <div className="d-flex flex-column add-cont">
                  <p>
                    {orderData?.[0]?.shipping_fname +
                      " " +
                      orderData?.[0]?.shipping_lname}
                  </p>
                  <p>{orderData?.[0]?.shipping_email}</p>
                  <p>{orderData?.[0]?.shipping_phone}</p>
                  <p>
                    {orderData?.[0]?.shipping_street_address},{" "}
                    {orderData?.[0]?.shipping_city},{" "}
                    {orderData?.[0]?.shipping_state},{" "}
                    {orderData?.[0]?.get_shipping_country_name?.name} -{" "}
                    {orderData?.[0]?.shipping_postcode}
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <h3>Billing Details</h3>
                <div className="d-flex flex-column add-cont">
                  <p>
                    {orderData?.[0]?.billing_fname +
                      " " +
                      orderData?.[0]?.billing_lname}
                  </p>
                  <p>{orderData?.[0]?.billing_email}</p>
                  <p>{orderData?.[0]?.billing_phone}</p>
                  <p>
                    {orderData?.[0]?.billing_street_address},{" "}
                    {orderData?.[0]?.billing_city},{" "}
                    {orderData?.[0]?.billing_state},{" "}
                    {orderData?.[0]?.get_billing_country_name?.name} -{" "}
                    {orderData?.[0]?.billing_postcode}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="or-det-sec">
            <h3>Order Summary</h3>
            <div className="order-box">
              <div className="order-det">
                <div className="order-det-top">
                  <div className="det-top-left">
                    <ul>
                      <li>
                        <b>OrderId</b>
                        <p>:{" " + orderData?.[0]?.order_number}</p>
                      </li>
                      <li>
                        <b>Purchased on</b>
                        <p>
                          :{" "}
                          {dateFormat(orderData?.[0]?.order_date, "dd/mm/yyyy")}
                        </p>
                      </li>
                      <li>
                        <b>Total No. Of Item</b>
                        <p>:{" " + orderData?.[0]?.total_item}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="det-top-right">
                    <h3>
                      Order Total :{" "}
                      <span>
                        Rs.{" "}
                        {
                          orderData?.[0]?.get_order_details?.[0]
                            ?.unit_price_original
                        }{" "}
                      </span>
                    </h3>
                    <p>
                      Status :{" "}
                      <span
                        className={
                          orderData?.[0]?.status === "I"
                            ? "stat-yellow"
                            : orderData?.[0]?.status === "N"
                            ? "stat-green"
                            : "stat-red"
                        }
                      >
                        {orderData?.[0]?.status === "I" && (
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
                        {orderData?.[0]?.status === "N" && (
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
                        {orderData?.[0]?.status === "C" && (
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
                        {orderData?.[0]?.status === "I"
                          ? "Initiated"
                          : orderData?.[0]?.status === "N"
                          ? "Delivered"
                          : orderData?.[0]?.status === "C"
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
                    Delivered On :{" "}
                    {orderData?.[0]?.delivery_date
                      ? dateFormat(orderData?.[0]?.order_date, "dd/mm/yyyy")
                      : "-"}
                  </h4>
                  <div className="order-det-right">
                    <h5>
                      Payment Mode :{" "}
                      {orderData?.[0]?.payment_method === "O"
                        ? "Online"
                        : "Cash on Delivery"}
                    </h5>
                  </div>
                 {orderData?.[0]?.payment_method === "O" && <div className="order-det-right">
                    <h5>
                      Transition Id:{" "}
                      {orderData?.[0]?.payments_details?.tran_id}
                    </h5>
                  </div>}
                </div>
              </div>
            </div>
          </div>
          <div className="prod-det-sec">
            <h1>Product Details</h1>
            {orderData?.[0]?.get_order_details?.map((item, index) => {
              return <OrderDetailsBox key={index} data={item} />;
            })}
          </div>
        </div>
      </ProfileLayout>
    </>
  );
};

export default userRoutes(OrderDetails);
