import ProfileLayout from "@/Components/ProfileLayout";
import Head from "next/head";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FieldError from "@/Components/FieldError";
import userRoutes from "@/Components/Routes/UserRoutes";
import useCommonApi from "@/hooks/useCommonApi";
import { useDispatch} from "react-redux";
import { toggleLoader} from "@/redux/userSlice";
import { toast } from "react-toastify";
import axios from "@/APiSetUp/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

const AddAddress = () => {
  const dispatch = useDispatch();
  const {
    countryList,
    stateList,
    // setStateList,
    getCountryList,
    // getStateList,
  } = useCommonApi();

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    getCountryList();
  }, [getCountryList]);

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
    default: "",
    address_title:""
  };

  const validationSchema = Yup.object({
    address_title: Yup.string().trim().required("Please enter address title!"),
    fname: Yup.string().trim().required("Please enter your first name!"),
    lname: Yup.string().trim().required("Please enter your last name!"),
    phone: Yup.string()
      .trim()
      .required("Please enter your phone number!")
      .matches(/^([0-9\s\-+()]*)$/, "Invalid phone number")
      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number contains maximum 10 characters"),
    email: Yup.string()
      .trim()
      .required("Please enter your email !")
      .email("Please enter a valid email!")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format!")
      .nullable(),
    country: Yup.string().trim().required("Please select your country!"),
    state: Yup.string().trim().required("Please select your state!"),
    city: Yup.string().trim().required("Please enter your city!"),
    address: Yup.string().trim().required("Please enter your full address!"),
    postcode: Yup.string().trim().required("Please enter your postcode!")
      .matches(/^[1-9][0-9]{5}$/, "Invalid pin code!"),
  });

  const onSubmit = (values, actions) => {
    const data = {
      params: {
        first_name: values?.fname,
        last_name: values?.lname,
        address: values?.address,
        is_defult: values?.default?"Y":"N",
        country: values?.country,
        state: values?.state,
        city: values?.city,
        postcode: values?.postcode,
        mobile: values?.phone,
        address_title: values?.address_title,
        email: values?.email,
      },
    };
    dispatch(toggleLoader());
    axios.post("add-address", data).then((res) => {
      dispatch(toggleLoader());
      if (res.data.result) {
        toast.success(res?.data?.result?.status);
        router.push("/address-book")
        window.scrollTo(0, 0);
        actions.resetForm();
      } else if (res?.data?.error) {
        toast.error(res?.data?.error?.meaning);
        window.scrollTo(0, 0);
      }
    });
  };
  return (
    <>
      <Head>
        <title>Add Address || Fast Buy</title>
        <meta name="description" content="Add Address || Fast Buy"></meta>
      </Head>
      <ProfileLayout>
        <div className="dash-form">
          <div className="addressLayoutHead">
            <h1>Add Address</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <Link href="/address-book">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 13.5L6.75 9L11.25 4.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Back
            </Link>
          </div>
          <div className="address-form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={onSubmit}
            >
              {({ values }) => (
                <Form>
                  <div className="row">
                    <h3>Contact Information</h3>
                    <div className="col-12 col-sm-12">
                      <div className="cont-frm-box">
                        <Field type="text" name="address_title" />
                        <label
                          htmlFor
                          className={values?.address_title && `label-value`}
                        >
                          Address Title
                        </label>
                        <ErrorMessage name="address_title" component={FieldError} />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="cont-frm-box">
                        <Field type="text" name="fname" />
                        <label
                          htmlFor
                          className={values?.fname && `label-value`}
                        >
                          First Name
                        </label>
                        <ErrorMessage name="fname" component={FieldError} />
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
                        <ErrorMessage name="lname" component={FieldError} />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="cont-frm-box">
                        <Field type="text" name="phone" />
                        <label
                          htmlFor
                          className={values?.phone && `label-value`}
                        >
                          Phone Number
                        </label>
                        <ErrorMessage name="phone" component={FieldError} />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="cont-frm-box">
                        <Field type="text" name="email" />
                        <label
                          htmlFor
                          className={values?.email && `label-value`}
                        >
                          Email
                        </label>
                        <ErrorMessage name="email" component={FieldError} />
                      </div>
                    </div>
                    <h3 className="mt-3">Address Information</h3>
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
                        <ErrorMessage name="country" component={FieldError} />
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
                        <ErrorMessage name="state" component={FieldError} />
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
                        <ErrorMessage name="city" component={FieldError} />
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
                        <ErrorMessage name="postcode" component={FieldError} />
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
                        <ErrorMessage name="address" component={FieldError} />
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
                            Use as my default shipping address
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form_submit d-flex flex-column">
                      <button type="submit">Save address</button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
};

export default userRoutes(AddAddress);
