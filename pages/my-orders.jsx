import OrderBox from "@/Components/Common/OrderBox";
import ProfileLayout from "@/Components/ProfileLayout";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import userRoutes from "@/Components/Routes/UserRoutes";
import NodataFound from "@/Components/NodataFound";
import { useDispatch } from "react-redux";
import { toggleLoader } from "@/redux/userSlice";
import { toast } from "react-toastify";
import axios from "@/APiSetUp/axios";

const MyOrders = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [orderData, setOrderData] = useState([]);
  const [orderCount, setOrderCount] = useState("");

  const getOrders = useCallback(() => {
    const data = {
      params: {
        status: "",
        from_date: "",
        to_date: "",
        page_no: page,
      },
    };
    dispatch(toggleLoader());
    axios.post("order-history", data).then((res) => {
      dispatch(toggleLoader());
      if (res.data) {
        setOrderData([...orderData, ...res?.data?.orderlist]);
        setOrderCount(res?.data?.order_count);
      } else if (res?.data?.error) {
        toast.error(res?.data?.error?.meaning);
        window.scrollTo(0, 0);
      }
    });
  }, [page, dispatch]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <Head>
        <title>My Orders || Fast Buy</title>
        <meta name="description" content="My Orders || Fast Buy"></meta>
      </Head>
      <ProfileLayout>
        <div className="addressLayout">
          <div className="addressLayoutHead">
            <h1>My Orders</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          {orderData ? (
            <>
              {orderData?.map((item, index) => {
                return (
                  <OrderBox
                    key={index}
                    data={item}
                    setOrderData={setOrderData}
                  />
                );
              })}
              {orderData?.length !== orderCount && (
                <div className="load-butto">
                  <a onClick={() => setPage(page + 1)}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2V6"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 18V22"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.92969 4.92999L7.75969 7.75999"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.2383 16.24L19.0683 19.07"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2 12H6"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 12H22"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.92969 19.07L7.75969 16.24"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.2383 7.75999L19.0683 4.92999"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Load more
                  </a>
                </div>
              )}
            </>
          ) : (
            <NodataFound msg="You have not ordered anything yet." />
          )}
        </div>
      </ProfileLayout>
    </>
  );
};

export default userRoutes(MyOrders);
