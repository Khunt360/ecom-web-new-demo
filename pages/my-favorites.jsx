import UpcomingProductCard from "@/Components/Common/UpcomingProductCard";
import ProfileLayout from "@/Components/ProfileLayout";
import { toggleLoader } from "@/redux/userSlice";
import Head from "next/head";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "@/APiSetUp/axios";
import userRoutes from "@/Components/Routes/UserRoutes";
import useCommonApi from "@/hooks/useCommonApi";
import { toast } from "react-toastify";
import NodataFound from "@/Components/NodataFound";

const MyFavorites = () => {
  const {
    getCount
  } = useCommonApi();

  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)

  const getData = (isNew) => {
    const body = {
      params: {
        page_no: page,
        per_page: '9'
      },
    }
    dispatch(toggleLoader());
    axios.post("/get-wishlist", body).then((res) => {
      if (res) {
        setData(isNew ? res?.data : (data ? {...res?.data,productDetails:[...data?.productDetails,...res?.data?.productDetails]} : res?.data))
      }
    }).finally(() => {
      dispatch(toggleLoader());
    });
  }
  const removeItem = (productId) => {
    swal({
      text: "Are you sure you want to remove this product?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((isConfirmed) => {
      if (isConfirmed) {
        let data = {
          params: {
            product_id: productId,
          },
        };
        dispatch(toggleLoader());
        axios.post("/wishlists", data).then((res) => {
          dispatch(toggleLoader());
          if (res?.data?.result) {
            getData(true)
            getCount()
            toast.success(res?.data?.result?.status?.meaning);
          } else if (res.data.error) {
          }
        });
      }
    });
  };
  useEffect(() => {
    getData(true)
  }, [page])

  return (
    <>
      <Head>
        <title>My Favorites || Fast Buy</title>
        <meta name="description" content="My Favorites || Fast Buy"></meta>
      </Head>
      <ProfileLayout>
        
        <div className="addressLayout wishlist">
          <div className="addressLayoutHead">
            <h1>My Favorites</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="mt-4 row ">
          {data?.productDetails?.length > 0 ? data?.productDetails?.map((item, i) => {
            return (
              <div className="col-sm-6 col-md-6 col-lg-4" key={i}>
                <UpcomingProductCard item={item} isWishlist slNo={i + 1} addRemoveToWishlist={removeItem}/>
              </div>
            );
          }) : <div className="text-center"><NodataFound msg={"Your wishlist is currently empty."}/></div>}
        </div>
          {data?.productDetails?.length !== data?.product_count && <div className="load-butto">
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
          </div>}
        </div>
      </ProfileLayout>
    </>
  );
};

export default userRoutes(MyFavorites);
