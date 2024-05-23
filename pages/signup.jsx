import CommonBreadcrump from "@/Components/Common/CommonBreadcrump";
import Head from "next/head";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FieldError from "@/Components/FieldError";
import Link from "next/link";
import LoginLayout from "@/Components/Common/LoginLayout";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "@/APiSetUp/axios";
import { toggleLoader } from "@/redux/userSlice";
import { useState } from "react";
import LoginRoutes from "@/Components/Routes/LoginRoutes";
import Header from "@/Components/Header";
import { fetchCategoryList } from "@/hooks/useCommonData";

const Signup = ({categoryList}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const initialValues = {
    name: "",
    email:"",
    phone: "",
    password: "",
    password_confirmation: "",
    eye: false,
    eye1: false,
  };
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Please enter your name!"),
    email: Yup.string()
    .trim()
    .required("Please enter your email !")
    .email("Please enter a valid email!")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format!")
    .nullable(),
    phone: Yup.string()
      .trim()
      .required("Please enter your phone number!")
      .matches(/^([0-9\s\-+()]*)$/, "Invalid phone number")
      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number contains maximum 10 characters"),
    password: Yup.string()
      .trim()
      .required("Please enter a password!")
      .min(8, "Please give at-least 8 character!"),
    password_confirmation: Yup.string()
      .trim()
      .oneOf([Yup.ref("password"), ""], "Passwords is not matching!")
      .required("Please confirm your password!"),
  });
  const onSubmit = (values, actions) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("password", values.password);
    formData.append("confirm_password", values.password_confirmation);

    dispatch(toggleLoader());
    axios.post("/signUp", formData).then((res) => {
      dispatch(toggleLoader());
      if (res.data.result) {
        setMessage(res?.data?.result?.status?.meaning);
        actions.resetForm();
      } else if (res.data.error) {
        toast.error(res.data.error.meaning);
      }
    });
  };
  return (
    <>
      <Head>
        <title>Sign Up || Fast Buy</title>
        <meta name="description" content="Sign Up || Fast Buy"></meta>
      </Head>
      {message ? (
        <div className="verification">
          <img src="/images/success.webp" alt="success" />
          <h2>Success !</h2>
          <p>{message}</p>
          <Link href="/login">Go to Login</Link>
        </div>
      ) : (
      <>
      <Header categoryList={categoryList}/>
      <CommonBreadcrump title="Sign Up" />
      <LoginLayout>
        <div className="form-cont">
          <h1>Create An Account</h1>
          <h3>Please fill in the below fields to create an account</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="row">
                  <div className="col-12 col-sm-12">
                    <div className="cont-frm-box">
                      <Field type="text" name="name" />
                      <label htmlFor className={values?.name && `label-value`}>Name</label>
                      <ErrorMessage name="name" component={FieldError} />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 ">
                    <div className="cont-frm-box">
                      <Field type="text" name="email" />
                      <label htmlFor className={values?.email && `label-value`}>Email</label>
                      <ErrorMessage name="email" component={FieldError} />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="cont-frm-box">
                      <Field type="text" name="phone" />
                      <label htmlFor className={values?.phone && `label-value`}>Phone Number</label>
                      <ErrorMessage name="phone" component={FieldError} />
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="cont-frm-box position-relative">
                      <Field
                        type={values.eye1 ? "text" : "password"}
                        name="password"
                      />
                      <label htmlFor className={values?.password && `label-value`}>Password</label>
                      <span
                        className="input-group-addon"
                        name="eye1"
                        onClick={() => {
                          setFieldValue("eye1", !values.eye1);
                        }}
                      >
                        <img
                          src={
                            !values.eye1
                              ? `/images/eye.svg`
                              : `/images/eye-off.webp`
                          }
                          alt="eye"
                        />
                      </span>
                      <ErrorMessage name="password" component={FieldError} />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="cont-frm-box position-relative">
                      <Field
                        type={values.eye2 ? "text" : "password"}
                        name="password_confirmation"
                      />
                      <label htmlFor className={values?.password_confirmation && `label-value`}>Confirm Password</label>
                      <span
                        className="input-group-addon"
                        name="eye2"
                        onClick={() => {
                          setFieldValue("eye2", !values.eye2);
                        }}
                      >
                        <img
                          src={
                            !values.eye2
                              ? `/images/eye.svg`
                              : `/images/eye-off.webp`
                          }
                          alt="eye"
                        />
                      </span>
                      <ErrorMessage name="password_confirmation" component={FieldError} />
                    </div>
                  </div>
                  <p className="aggree">
                    By clicking on sign up, you agree that you have read &
                    accepted our <Link href="#">Terms of services</Link> and{" "}
                    <Link href="#">Privacy policy</Link>
                  </p>
                  <div className="form_submit d-flex flex-column">
                    <button type="submit">Sign Up</button>
                    <span>Or</span>
                    <Link href="/login">Continue to login</Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </LoginLayout>
      </>
      )}
    </>
  );
};

export default LoginRoutes(Signup);

export async function getStaticProps() {
  try {
    // Extract data from the responses
    const response1 = await fetchCategoryList();
    const categoryList = response1.categoryList;

    // Return the data as props
    return {
      props: {
        categoryList,
      },
      revalidate: 86400, // Re-generate the page every 24 hours (86400 seconds)
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true, // Return 404 page if there's an error
    };
  }
}
