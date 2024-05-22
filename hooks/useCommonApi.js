import { useState, useCallback } from "react";
import axios from "@/APiSetUp/axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader, updateUser } from "@/redux/userSlice";
import { toast } from "react-toastify";
import { updateCart, updateCount } from "@/redux/cartSlice";
import Cookies from "js-cookie";

const useCommonApi = () => {
  const dispatch = useDispatch();
  const auth_token = Cookies.get("auth_token");

  // const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState();
  // const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [addressData, setAddressData] = useState([]);
  // const [footerData, setFooterData] = useState(null);

  // const getCountryList = useCallback(() => {
  //   dispatch(toggleLoader());
  //   axios
  //     .post("country-list")
  //     .then((res) => {
  //       setCountryList([res?.data?.result?.country_list]);
  //       setStateList(res?.data?.result?.state_list);
  //       // Dispatch toggleLoader only once after the API call completes
  //     })
  //     .finally(() => {
  //       dispatch(toggleLoader());
  //     });
  // }, [dispatch]);

  const getUserData = useCallback(() => {
    dispatch(toggleLoader());
    axios
      .post("user-details")
      .then((res) => {
        if (res?.data?.result?.userData) {
          dispatch(updateUser(res?.data?.result?.userData));
          setProfileImageUrl(res?.data?.result?.userData?.image_path);
        }
      })
      .finally(() => {
        dispatch(toggleLoader());
      });
  }, [dispatch]);

  // const getCategoryList = useCallback(() => {
  //   dispatch(toggleLoader());
  //   axios
  //     .post("/category-list")
  //     .then((res) => {
  //       setCategoryList(res?.data?.result?.category_list);
  //     })
  //     .finally(() => {
  //       dispatch(toggleLoader());
  //     });
  // }, [dispatch]);

  const getSubcategoryList = useCallback(
    (id) => {
      let data = {
        params: {
          category: id,
        },
      };
      dispatch(toggleLoader());
      axios
        .post("/subcategory-list", data)
        .then((res) => {
          setSubcategoryList(res?.data?.result?.subcategory_list);
        })
        .finally(() => {
          dispatch(toggleLoader());
        });
    },
    [dispatch]
  );

  const getCount = useCallback(() => {
    const body = {
      params: {
        ...(!auth_token && {
          session_id: localStorage.getItem("sessionId"),
        }),
      },
    };
    dispatch(toggleLoader());
    axios
      .post(auth_token ? "/get-count" : "/get-temp-count", body)
      .then((res) => {
        if (res) {
          dispatch(updateCount(res?.data));
        }
      })
      .finally(() => {
        dispatch(toggleLoader());
      });
  }, [dispatch,auth_token]);

  const getCartList = useCallback(() => {
    const body = {
      params: {
        coupon_code: "",
        ...(!auth_token && {
          session_id: localStorage.getItem("sessionId"),
        }),
      },
    };
    dispatch(toggleLoader());
    axios
      .post(auth_token ? "/get-cart-list" : "/get-temp-cart-list", body)
      .then((res) => {
        if (res) {
          dispatch(updateCart(res?.data?.cartList?.[0]));
        }
      })
      .finally(() => {
        dispatch(toggleLoader());
      });
  }, [dispatch,auth_token]);

  const addToCart = useCallback(
    (productId) => {
      if (productId) {
        let data = {
          params: {
            product_id: productId,
            quantity: 1,
            ...(!auth_token && {
              session_id: localStorage.getItem("sessionId"),
            }),
          },
        };
        dispatch(toggleLoader());
        axios
          .post(auth_token ? "/add-to-cart" : "/add-to-temp-cart", data)
          .then((res) => {
            dispatch(toggleLoader());
            if (res?.data?.result) {
              toast.success(res?.data?.result?.status?.meaning);
              getCartList();
              getCount();
            } else if (res.data.error) {
            }
          });
      }
    },
    [dispatch, getCartList, getCount,auth_token]
  );

  const addRemoveToWishlist = useCallback(
    (productId) => {
      if (productId) {
        let data = {
          params: {
            product_id: productId,
          },
        };
        dispatch(toggleLoader());
        axios.post("/wishlists", data).then((res) => {
          dispatch(toggleLoader());
          if (res?.data?.result) {
            toast.success(res?.data?.result?.status?.meaning);
            getCount();
          } else if (res.data.error) {
          }
        });
      }
    },
    [dispatch, getCount]
  );
  const removeToCart = useCallback(
    (productId) => {
      if (productId) {
        let data = {
          params: {
            cart_details_id: +productId,
            ...(!auth_token && {
              session_id: localStorage.getItem("sessionId"),
            }),
          },
        };
        dispatch(toggleLoader());
        axios
          .post(
            auth_token ? "/remove-from-cart-qty" : "/remove-from-temp-cart-qty",
            data
          )
          .then((res) => {
            dispatch(toggleLoader());
            if (res?.data?.result) {
              toast.success(res?.data?.result?.status);
              getCount();
              getCartList();
            } else if (res.data.error) {
            }
          });
      }
    },
    [dispatch,auth_token,getCartList,getCount]
  );

  const deleteFromCart = useCallback(
    (id) => {
      swal({
        text: "Are you sure you want to remove this product?",
        icon: "warning",
        dangerMode: true,
        buttons: true,
      }).then((isConfirmed) => {
        if (isConfirmed) {
          const body = {
            params: {
              cart_details_id: id,
              ...(!auth_token && {
                session_id: localStorage.getItem("sessionId"),
              }),
            },
          };
          dispatch(toggleLoader());
          axios
            .post(
              auth_token ? "/remove-from-cart" : "/remove-from-temp-cart",
              body
            )
            .then((res) => {
              if (res) {
                toast.success(res?.data?.result?.status?.meaning);
                getCartList();
                getCount();
              }
            })
            .finally(() => {
              dispatch(toggleLoader());
            });
        }
      });
    },
    [dispatch,auth_token,getCartList,getCount]
  );

  const getAddressBook = useCallback(() => {
    dispatch(toggleLoader());
    axios
      .post("address-list")
      .then((res) => {
        if (res?.data) {
          setAddressData(res?.data?.address);
        } else if (res?.data?.error) {
          toast.error(res?.data?.error?.meaning);
        }
      })
      .finally(() => {
        dispatch(toggleLoader());
      });
  }, [dispatch]);


  return {
    // countryList,
    stateList,
    profileImageUrl,
    // categoryList,
    subcategoryList,
    addressData,
    // footerData,
    setAddressData,
    setSubcategoryList,
    // getCountryList,
    getUserData,
    // getCategoryList,
    getSubcategoryList,
    addToCart,
    getCartList,
    getCount,
    addRemoveToWishlist,
    deleteFromCart,
    getAddressBook,
    removeToCart,
    // getFooter
  };
};

export default useCommonApi;
