import CommonBreadcrump from "@/Components/Common/CommonBreadcrump";
import useCommonApi from "@/hooks/useCommonApi";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FieldError from "@/Components/FieldError";
import CartItemBox from "@/Components/Common/CartItemBox";
import OrderSummery from "@/Components/Common/OrderSummery";
import AddressBox from "@/Components/Common/AddressBox";
import { useDispatch, useSelector } from "react-redux";
import userRoutes from "@/Components/Routes/UserRoutes";
import swal from "sweetalert";
import { toggleLoader } from "@/redux/userSlice";
import { toast } from "react-toastify";
import axios from "@/APiSetUp/axios";
import NodataFound from "@/Components/NodataFound";
import Payment from "@/Components/Payment";
import { useRouter } from "next/router";

const Checkout = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const {
    countryList,
    stateList,
    // setStateList,
    getCountryList,
    // getStateList,
    addressData,
    getCount,
    getCartList,
    getAddressBook,
  } = useCommonApi();

  const { cartList } = useSelector((state) => state.cart);
  const [addressBookId, setAddressBookId] = useState(null);
  const [order, setOrder] = useState({})
  const [addressBookIdShip, setAddressBookIdShip] = useState(null);
  const [payOut, setPayOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    getCountryList();
    getCartList();
    getAddressBook();
  }, [getCountryList, getCartList, getAddressBook]);
  const [isCardFilled, setIsCardFilled] = useState(false)
  const [isCard, setIsCard] = useState(true)
  const initialValues = {
    fname: "",
    lname: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    state: "",
    postcode: "",
    address: "",
    billing_fname: "",
    billing_lname: "",
    billing_phone: "",
    billing_email: "",
    billing_country: "",
    billing_city: "",
    billing_state: "",
    billing_postcode: "",
    billing_address: "",
    default: "",
    pay: "O",
    same: "S",
    shipping: true,
    billing: true,
  };
  const validationSchema = Yup.object({
    same: Yup.string(),
    billing: Yup.boolean(),
    billing_fname: Yup.string().when(["same", "billing"], {
      is: (same, billing) => same === "B" && billing,
      then: () => Yup.string().trim().required("Please enter your first name!"),
    }),
    billing_lname: Yup.string().when(["same", "billing"], {
      is: (same, billing) => same === "B" && billing,
      then: () => Yup.string().trim().required("Please enter your last name!"),
    }),
    billing_phone: Yup.string().when(["same", "billing"], {
      is: (same, billing) => same === "B" && billing,
      then: () =>
        Yup.string()
          .trim()
          .required("Please enter your phone number!")
          .matches(/^([0-9\s\-+()]*)$/, "Invalid phone number")
          .min(10, "Phone number must be at least 10 characters")
          .max(10, "Phone number contains maximum 10 characters"),
    }),
    billing_email: Yup.string().when(["same", "billing"], {
      is: (same, billing) => same === "B" && billing,
      then: () =>
        Yup.string()
          .trim()
          .required("Please enter your email !")
          .email("Please enter a valid email!")
          .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format!"),
    }),
    billing_country: Yup.string().when(["same", "billing"], {
      is: (same, billing) => same === "B" && billing,
      then: () => Yup.string().trim().required("Please select your country!"),
    }),
    billing_state: Yup.string().when(["same", "billing"], {
      is: (same, billing) => same === "B" && billing,
      then: () => Yup.string().trim().required("Please select your state!"),
    }),
    billing_city: Yup.string().when(["same", "billing"], {
      is: (same, billing) => same === "B" && billing,
      then: () => Yup.string().trim().required("Please enter your city!"),
    }),
    billing_address: Yup.string().when(["same", "billing"], {
      is: (same, billing) => same === "B" && billing,
      then: () =>
        Yup.string().trim().required("Please enter your full address!"),
    }),
    billing_postcode: Yup.string().when(["same", "billing"], {
      is: (same, billing) => same === "B" && billing,
      then: () =>
        Yup.string()
          .trim()
          .required("Please enter your postcode!")
          .matches(/^[1-9][0-9]{5}$/, "Invalid pin code!"),
    }),
    shipping: Yup.boolean(),
    fname: Yup.string().when("shipping", {
      is: true,
      then: () => Yup.string().trim().required("Please enter your first name!"),
    }),
    lname: Yup.string().when("shipping", {
      is: true,
      then: () => Yup.string().trim().required("Please enter your last name!"),
    }),
    phone: Yup.string().when("shipping", {
      is: true,
      then: () =>
        Yup.string()
          .trim()
          .required("Please enter your phone number!")
          .matches(/^([0-9\s\-+()]*)$/, "Invalid phone number")
          .min(10, "Phone number must be at least 10 characters")
          .max(10, "Phone number contains maximum 10 characters"),
    }),
    email: Yup.string().when("shipping", {
      is: true,
      then: () =>
        Yup.string()
          .trim()
          .required("Please enter your email !")
          .email("Please enter a valid email!")
          .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format!")
          .nullable(),
    }),
    country: Yup.string().when("shipping", {
      is: true,
      then: () => Yup.string().trim().required("Please select your country!"),
    }),
    state: Yup.string().when("shipping", {
      is: true,
      then: () => Yup.string().trim().required("Please select your state!"),
    }),
    city: Yup.string().when("shipping", {
      is: true,
      then: () => Yup.string().trim().required("Please enter your city!"),
    }),
    address: Yup.string().when("shipping", {
      is: true,
      then: () =>
        Yup.string().trim().required("Please enter your full address!"),
    }),
    postcode: Yup.string().when("shipping", {
      is: true,
      then: () =>
        Yup.string()
          .trim()
          .required("Please enter your postcode!")
          .matches(/^[1-9][0-9]{5}$/, "Invalid pin code!"),
    }),
    pay: Yup.string().trim().required("Please select an option!"),
  });

  const onSubmit = (values, actions) => {
    if (isCard ? isCardFilled : true) {
      var formData = new FormData();
      if (values?.billing) {
        formData.append("billing_fname", values.billing_fname);
        formData.append("billing_lname", values.billing_lname);
        formData.append("billing_email", values.billing_email);
        formData.append("billing_phone", values.billing_phone);
        formData.append("billing_street_address", values.billing_address);
        formData.append("billing_state", values.billing_state);
        formData.append("billing_city", values.billing_city);
        formData.append("billing_country", values.billing_country);
        formData.append("billing_postcode", values.billing_postcode);
      } else {
        formData.append("billing_address_book_id", addressBookId);
      }
      formData.append(
        "same_as_shipping",
        values?.billing && values.same === "S" ? "Y" : "N"
      );
      if (values?.shipping) {
        formData.append("shipping_fname", values.fname);
        formData.append("shipping_lname", values.lname);
        formData.append("shipping_email", values.email);
        formData.append("shipping_phone", values.phone);
        formData.append("shipping_street_address", values.address);
        formData.append("shipping_state", values.state);
        formData.append("shipping_city", values.city);
        formData.append("shipping_country", values.country);
        formData.append("shipping_postcode", values.postcode);
      } else {
        formData.append("shipping_address_book_id", addressBookIdShip);
      }
      formData.append("total_amount", cartList?.total_after_discount);
      formData.append("is_saved_shipping_address", values?.shipping ? "N" : "Y");
      formData.append("is_saved_billing_address", values?.billing ? "N" : "Y");
      formData.append("is_saved_address", values?.default ? "Y" : "N");
      formData.append("payment_method", values?.pay);

      dispatch(toggleLoader());
      axios.post("order-place", formData).then((res) => {
        dispatch(toggleLoader());
        if (res.data.message) {
          toast.success(res.data.message);
          getCount();
          getCartList();
          if(values?.pay === "O"){
            setPayOut(true)
          }else{
            router.push("/my-orders");
          }
          setOrder(res?.data?.order)
        } else if (res?.data?.error) {
          toast.error(res.data.error);
          window.scrollTo(0, 0);
        }
      });
    } else {
      toast.error("Your card number is incomplete.");
    }
  };

  return (
    <>
      <Head>
        <title>Checkout || Fast Buy</title>
        <meta name="description" content="Checkout || Fast Buy"></meta>
      </Head>
      <CommonBreadcrump
        title="Checkout"
        sub1="Trending Collection"
        link1="#"
        sub2="Cart"
        link2="#"
      />
      {cartList ? (
        <div className="addressLayout checkoutLay">
          <div className="addressLayoutHead">
            <h2>Shipping Address</h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="row">
                  <div className="col-12 col-md-7">
                    <div className="check-form-sec">
                      <div className="check-butto-grp">
                        <button
                          type="button"
                          className={values?.shipping ? "active" : ""}
                          onClick={() => {
                            setFieldValue("shipping", true);
                            setAddressBookIdShip(null);
                          }}
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.1654 4.25L6.3737 12.0417L2.83203 8.5"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Create New Address
                        </button>
                        <button
                          type="button"
                          className={!values?.shipping ? "active" : ""}
                          onClick={() =>
                            addressData?.length > 0
                              ? setFieldValue("shipping", false)
                              : swal(
                                "At the moment, no addresses are saved in your account.",
                                {
                                  icon: "error",
                                }
                              )
                          }
                        >
                          Use Saved Address
                        </button>
                      </div>
                      <div className="address-form">
                        {values?.shipping ? (
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="cont-frm-box">
                                <Field type="text" name="fname" />
                                <label
                                  htmlFor
                                  className={values?.fname && `label-value`}
                                >
                                  First Name
                                </label>
                                <ErrorMessage
                                  name="fname"
                                  component={FieldError}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="cont-frm-box">
                                <Field type="text" name="lname" />
                                <label
                                  htmlFor
                                  className={values?.lname && `label-value`}
                                >
                                  Last Name
                                </label>
                                <ErrorMessage
                                  name="lname"
                                  component={FieldError}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-12">
                              <div className="cont-frm-box">
                                <Field type="text" name="phone" />
                                <label
                                  htmlFor
                                  className={values?.phone && `label-value`}
                                >
                                  Phone Number
                                </label>
                                <ErrorMessage
                                  name="phone"
                                  component={FieldError}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-12">
                              <div className="cont-frm-box">
                                <Field type="text" name="email" />
                                <label
                                  htmlFor
                                  className={values?.email && `label-value`}
                                >
                                  Email
                                </label>
                                <ErrorMessage
                                  name="email"
                                  component={FieldError}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-12">
                              <div className="cont-frm-box position-relative">
                                <Field as="select" name="country">
                                  <option value="">select</option>
                                  {countryList?.map((item, index) => {
                                    return (
                                      <option value={item?.id} key={index}>
                                        {item?.name}
                                      </option>
                                    );
                                  })}
                                </Field>
                                <label htmlFor>Country/Region</label>
                                <span className="input-group-addon">
                                  <img src="/images/select.webp" alt="select" />
                                </span>
                                <ErrorMessage
                                  name="country"
                                  component={FieldError}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-4">
                              <div className="cont-frm-box position-relative">
                                <Field
                                  as="select"
                                  name="state"
                                  disabled={!values.country}
                                >
                                  <option value="">select</option>
                                  {stateList?.map((item, index) => {
                                    return (
                                      <option value={item?.name} key={index}>
                                        {item?.name}
                                      </option>
                                    );
                                  })}
                                </Field>
                                <label htmlFor>State</label>
                                <span className="input-group-addon">
                                  <img src="/images/select.webp" alt="select" />
                                </span>
                                <ErrorMessage
                                  name="state"
                                  component={FieldError}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-4">
                              <div className="cont-frm-box">
                                <Field type="text" name="city" />
                                <label
                                  htmlFor
                                  className={values?.city && `label-value`}
                                >
                                  City
                                </label>
                                <ErrorMessage
                                  name="city"
                                  component={FieldError}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-4">
                              <div className="cont-frm-box">
                                <Field type="text" name="postcode" />
                                <label
                                  htmlFor
                                  className={values?.postcode && `label-value`}
                                >
                                  Postcode
                                </label>
                                <ErrorMessage
                                  name="postcode"
                                  component={FieldError}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-12">
                              <div className="cont-frm-box">
                                <Field type="text" name="address" />
                                <label
                                  htmlFor
                                  className={values?.address && `label-value`}
                                >
                                  Full Address / Landmark
                                </label>
                                <ErrorMessage
                                  name="address"
                                  component={FieldError}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-12">
                              <div className="cont-frm-box">
                                <div className="tu-check tu-checksm">
                                  <Field
                                    type="checkbox"
                                    id="expcheck2a3"
                                    name="default"
                                  />
                                  <label htmlFor="expcheck2a3">
                                    Save this information for an easy checkout
                                    next time
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="row">
                            {addressData?.map((item, index) => {
                              return (
                                <AddressBox
                                  key={index}
                                  data={item}
                                  isEdit={true}
                                  addressBookId={addressBookIdShip}
                                  setAddressBookId={setAddressBookIdShip}
                                />
                              );
                            })}
                          </div>
                        )}
                        <div className="payment-sec">
                          <h2>Payment</h2>
                          <p>
                            All transactions are completely secure and encrypted
                          </p>
                          <div className="pay-op-box">
                            <div
                              className={`quote-radio online-op-sec custom_radio ${values?.pay === "O" ? "active" : ""
                                }`}
                            >
                              <input
                                type="radio"
                                id="featured-1"
                                name="pay"
                                value="O"
                                checked={values?.pay === "O"}
                                onChange={(e) => {
                                  setFieldValue("pay", e.target.value);
                                  setIsCard(true)
                                }}
                              />
                              <label for="featured-1">
                                Online Payment
                                <img
                                  src="/images/pay-option.webp"
                                  alt="option"
                                />
                              </label>
                            </div>
                            {values?.pay === "O" && (
                              <div className="pay-bott-info">
                                {`You'll receive an OTP after completing this order.
                            Please confirm it in the next step. Your order will
                            be shipped once you've confirmed it. Kindly note,
                            COD option is applicable only for Indian orders`}
                              </div>
                            )}
                            <div
                              className={`quote-radio custom_radio ${values?.pay === "C" ? "active" : ""
                                }`}
                            >
                              <input
                                type="radio"
                                id="featured-2"
                                name="pay"
                                value="C"
                                checked={values?.pay === "C"}
                                onChange={(e) => {
                                  setFieldValue("pay", e.target.value);
                                  setIsCard(false)
                                }}
                              />
                              <label for="featured-2">
                                Cash on Delivery (COD)
                              </label>
                            </div>
                            {values?.pay === "C" && (
                              <div className="pay-bott-info">
                                {`You'll receive an OTP after completing this order.
                            Please confirm it in the next step. Your order will
                            be shipped once you've confirmed it. Kindly note,
                            COD option is applicable only for Indian orders`}
                              </div>
                            )}
                            <ErrorMessage name="pay" component={FieldError} />
                          </div>
                        </div>
                      </div>
                      {(router?.pathname === "/checkout" && isCard) && <Payment
                        payOut={payOut}
                        orderId={order?.id}
                        setIsCardFilled={setIsCardFilled}
                        total={cartList?.total_after_discount}
                        addressBookId={addressBookId}
                      />
                      }
                      <div className="addressLayoutHead ex-mar-bill">
                        <h2>Billing Address</h2>
                      </div>
                      <div className="check-form-sec">
                        <div className="check-butto-grp mb-4">
                          <button
                            type="button"
                            className={values?.billing ? "active" : ""}
                            onClick={() => {
                              setFieldValue("billing", true);
                              setAddressBookId(null);
                            }}
                          >
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.1654 4.25L6.3737 12.0417L2.83203 8.5"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            Create New Address
                          </button>
                          <button
                            type="button"
                            className={!values?.billing ? "active" : ""}
                            onClick={() =>
                              addressData?.length > 0
                                ? setFieldValue("billing", false)
                                : swal(
                                  "At the moment, no addresses are saved in your account.",
                                  {
                                    icon: "error",
                                  }
                                )
                            }
                          >
                            Use Saved Address
                          </button>
                        </div>
                        {values?.billing ? (
                          <>
                            <div className="pay-op-box ex-mar-pay">
                              <div
                                className={`quote-radio custom_radio ${values?.same === "S" ? "active" : ""
                                  }`}
                              >
                                <input
                                  type="radio"
                                  id="featured-3"
                                  name="same"
                                  value="S"
                                  checked={values?.same === "S"}
                                  onChange={(e) => {
                                    setFieldValue("same", e.target.value);
                                  }}
                                />
                                <label for="featured-3">
                                  Same as shipping address
                                </label>
                              </div>
                              <div
                                className={`quote-radio custom_radio ${values?.same === "B" ? "active" : ""
                                  }`}
                              >
                                <input
                                  type="radio"
                                  id="featured-4"
                                  name="same"
                                  value="B"
                                  checked={values?.same === "B"}
                                  onChange={(e) => {
                                    setFieldValue("same", e.target.value);
                                  }}
                                />
                                <label for="featured-4">
                                  Use a different billing address
                                </label>
                              </div>
                            </div>
                            {values?.same === "B" && (
                              <div className="address-form">
                                <div className="row">
                                  <div className="col-12 col-sm-6">
                                    <div className="cont-frm-box">
                                      <Field type="text" name="billing_fname" />
                                      <label
                                        htmlFor
                                        className={
                                          values?.billing_fname && `label-value`
                                        }
                                      >
                                        First Name
                                      </label>
                                      <ErrorMessage
                                        name="billing_fname"
                                        component={FieldError}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-6">
                                    <div className="cont-frm-box">
                                      <Field type="text" name="billing_lname" />
                                      <label
                                        htmlFor
                                        className={
                                          values?.billing_lname && `label-value`
                                        }
                                      >
                                        Last Name
                                      </label>
                                      <ErrorMessage
                                        name="billing_lname"
                                        component={FieldError}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-12">
                                    <div className="cont-frm-box">
                                      <Field type="text" name="billing_phone" />
                                      <label
                                        htmlFor
                                        className={
                                          values?.billing_phone && `label-value`
                                        }
                                      >
                                        Phone Number
                                      </label>
                                      <ErrorMessage
                                        name="billing_phone"
                                        component={FieldError}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-12">
                                    <div className="cont-frm-box">
                                      <Field type="text" name="billing_email" />
                                      <label
                                        htmlFor
                                        className={
                                          values?.billing_email && `label-value`
                                        }
                                      >
                                        Email
                                      </label>
                                      <ErrorMessage
                                        name="billing_email"
                                        component={FieldError}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-12">
                                    <div className="cont-frm-box position-relative">
                                      <Field as="select" name="billing_country">
                                        <option value="">select</option>
                                        {countryList?.map((item, index) => {
                                          return (
                                            <option
                                              value={item?.value}
                                              key={index}
                                            >
                                              {item?.name}
                                            </option>
                                          );
                                        })}
                                      </Field>
                                      <label htmlFor>Country/Region</label>
                                      <span className="input-group-addon">
                                        <img
                                          src="/images/select.webp"
                                          alt="select"
                                        />
                                      </span>
                                      <ErrorMessage
                                        name="billing_country"
                                        component={FieldError}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-4">
                                    <div className="cont-frm-box position-relative">
                                      <Field
                                        as="select"
                                        name="billing_state"
                                        disabled={!values.billing_country}
                                      >
                                        <option value="">select</option>
                                        {stateList?.map((item, index) => {
                                          return (
                                            <option
                                              value={item?.value}
                                              key={index}
                                            >
                                              {item?.name}
                                            </option>
                                          );
                                        })}
                                      </Field>
                                      <label htmlFor>State</label>
                                      <span className="input-group-addon">
                                        <img
                                          src="/images/select.webp"
                                          alt="select"
                                        />
                                      </span>
                                      <ErrorMessage
                                        name="billing_state"
                                        component={FieldError}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-4">
                                    <div className="cont-frm-box">
                                      <Field type="text" name="billing_city" />
                                      <label
                                        htmlFor
                                        className={
                                          values?.billing_city && `label-value`
                                        }
                                      >
                                        City
                                      </label>
                                      <ErrorMessage
                                        name="billing_city"
                                        component={FieldError}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-4">
                                    <div className="cont-frm-box">
                                      <Field
                                        type="text"
                                        name="billing_postcode"
                                      />
                                      <label
                                        htmlFor
                                        className={
                                          values?.billing_postcode &&
                                          `label-value`
                                        }
                                      >
                                        Postcode
                                      </label>
                                      <ErrorMessage
                                        name="billing_postcode"
                                        component={FieldError}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-12">
                                    <div className="cont-frm-box">
                                      <Field
                                        type="text"
                                        name="billing_address"
                                      />
                                      <label
                                        htmlFor
                                        className={
                                          values?.billing_address &&
                                          `label-value`
                                        }
                                      >
                                        Full Address / Landmark
                                      </label>
                                      <ErrorMessage
                                        name="billing_address"
                                        component={FieldError}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="row">
                            {addressData?.map((item, index) => {
                              return (
                                <AddressBox
                                  key={index}
                                  data={item}
                                  isEdit={true}
                                  addressBookId={addressBookId}
                                  setAddressBookId={setAddressBookId}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-5">
                    <div className="cart cartMain">
                      <h3>Order Summery</h3>
                      <div className="cartItem">
                        {cartList?.get_cart_details?.map((item, index) => {
                          return (
                            <CartItemBox
                              key={index}
                              data={item}
                              isQtyFixed={true}
                              isDelete={false}
                            />
                          );
                        })}
                      </div>
                      <OrderSummery
                        setIsCardFilled={setIsCardFilled}
                        isCard={isCard}
                        addressBookId={addressBookId}
                        order={order}
                        payOut={payOut}
                        data={cartList}
                        title="PAYMENT DETAIL"
                        buttonOutlinedText="Continue Shopping"
                        buttonContainerText="Place Order"
                        containerType={"submit"}
                        outlinedType={"button"}
                        buttonOutlinedLink="/search-product"
                        isDelivery
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <NodataFound msg="Your Cart is empty" />
      )}
    </>
  );
};

export default userRoutes(Checkout);
