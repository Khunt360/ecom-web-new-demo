import { useRouter } from 'next/router'
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

const ResetPassword = () => {
    const router = useRouter()
    const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const initialValues = {
    password: "",
    password_confirmation: "",
  };
  const validationSchema = Yup.object({
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
    const body = {
      "params": {
        "otp": router.query.code?.[0],
        "password": values.password
      }
    }
    dispatch(toggleLoader());
    axios.post("/new-password-updated", body).then((res) => {
      dispatch(toggleLoader());
      if (res.data.result) {
        router.push("/login")
        toast.success(res?.data?.result?.status?.meaning);
      } else if (res.data.error) {
        toast.error(res.data.error.meaning);
      }
    });
  };

  return (
    <>
    <Head>
      <title>Reset Password || Fast Buy</title>
      <meta name="description" content="Reset Password || Fast Buy"></meta>
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
    <CommonBreadcrump title="Reset Password" />
    <LoginLayout className="login reset-password">
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
                <div className="col-12 ">
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
                <div className="col-12 ">
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
                <div className="form_submit d-flex flex-column mt-3">
                  <button type="submit">Submit</button>
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
  )
}

export default ResetPassword
