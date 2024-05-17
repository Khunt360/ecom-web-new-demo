import CommonBreadcrump from "@/Components/Common/CommonBreadcrump";
import Head from "next/head";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FieldError from "@/Components/FieldError";
import Link from "next/link";
import LoginLayout from "@/Components/Common/LoginLayout";
import { useRouter } from "next/router";
import axios from "@/APiSetUp/axios";
import { useDispatch } from "react-redux";
import { toggleLoader, updateToken, updateUser } from "@/redux/userSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import LoginRoutes from "@/Components/Routes/LoginRoutes";
import useCommonApi from "@/hooks/useCommonApi";
import { useEffect, useState } from "react";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const initialValues = {
    email: Cookies.get("login_email") || "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .required("Please enter your email !")
      .email("Please enter a valid email!")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format!")
      .nullable(),
  });
  const onSubmit = (values, actions) => {
    let data = {
      params: {
        email: values.email,
      },
    };
    dispatch(toggleLoader());
    axios.post("/reset-password", data).then((res) => {
      dispatch(toggleLoader());
      if (res.data.result) {
        setMessage(res?.data?.result?.status?.meaning);
      } else if (res.data.error) {
        toast.error(res.data.error.meaning);
      }
    });
  };


  return (
    <>
      <Head>
        <title>Forgot Password || Fast Buy</title>
        <meta name="description" content="Forgot Password || Fast Buy"></meta>
      </Head>
      {message ? (
        <div className="verification">
          <img src="/images/success.webp" alt="success" />
          <h2>Success !</h2>
          <p>{message}</p>
          <Link href="/login">Go to Login</Link>
        </div>
      ) : (<>
        <CommonBreadcrump title="Forgot Password" />
        <LoginLayout className="login forgot-password">
          <div className="form-cont">
            <h1>Forgot Password</h1>
            <h3>
              Sign into your existing your order history, manage your preferences,
              and more!
            </h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={onSubmit}
            >
              {({ setFieldValue, values }) => (
                <Form>
                  <div className="row">
                    <div className="col-12 col-sm-12">
                      <div className="cont-frm-box">
                        <Field type="text" name="email" />
                        <label htmlFor className={values?.email && `label-value`}>Email</label>
                        <ErrorMessage name="email" component={FieldError} />
                      </div>
                    </div>

                    <div className="form_submit d-flex flex-column mt-3">
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </LoginLayout></>)}
    </>
  );
};

export default LoginRoutes(ForgotPassword);
