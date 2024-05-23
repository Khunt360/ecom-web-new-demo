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
import { useEffect } from "react";
import Header from "@/Components/Header";
import { fetchCategoryList } from "@/hooks/useCommonData";

const Login = ({categoryList}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getCartList,getCount } = useCommonApi();

  const initialValues = {
    email: Cookies.get("login_email") || "",
    password: Cookies.get("login_pass") || "",
    remember: Cookies.get("login_remember_me") === "true",
    eye: false,
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .required("Please enter your email !")
      .email("Please enter a valid email!")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format!")
      .nullable(),
    password: Yup.string()
      .trim()
      .required("Please enter a password!")
      .min(8, "Please give at-least 8 character!"),
  });
  const onSubmit = (values, actions) => {
    let data = {
      params: {
        email: values.email,
        password: values.password,
        session_id: localStorage.getItem("sessionId")
      },
    };
    dispatch(toggleLoader());
    axios.post("auth/login", data).then((res) => {
      dispatch(toggleLoader());
      if (res.data.result) {
        if (values.remember) {
          // Store login credentials in cookies
          Cookies.set("login_email", values.email);
          Cookies.set("login_pass", values.password);
          Cookies.set("login_remember_me", values.remember);
        } else {
          // Remove login credentials from cookies if remember me option is not checked
          Cookies.remove("login_email");
          Cookies.remove("login_pass");
          Cookies.remove("login_remember_me");
        }
        if (res?.data?.result?.token) {
          dispatch(updateUser(res?.data?.result?.userdata));
          dispatch(updateToken(res?.data?.result?.token));
          const body = {
            params: { session_id: localStorage.getItem("sessionId"), },
          }
          dispatch(toggleLoader());
          axios.post("/move-to-master-cart", body).then((res) => {
            if (res) {
              router.push("/edit-profile");
              actions.resetForm();
            }
          }).finally(() => {
            dispatch(toggleLoader());
          });
        }
      } else if (res.data.error) {
        toast.error(res.data.error.meaning);
      }
    });
  };

  useEffect(() => {
    getCartList();
    getCount();
  }, [])
  
  return (
    <>
      <Head>
        <title>Login || Fast Buy</title>
        <meta name="description" content="Login || Fast Buy"></meta>
      </Head>
      <Header categoryList={categoryList}/>
      <CommonBreadcrump title="Login" />
      <LoginLayout className="login">
        <div className="form-cont">
          <h1>Login</h1>
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

                  <div className="col-12 col-sm-12">
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
                  <div className="login-agree d-flex justify-content-between align-items-center">
                    <div className="tu-check tu-checksm">
                      <Field type="checkbox" id="expcheck2a3" name="remember" />
                      <label htmlFor="expcheck2a3">Remember me</label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="float-right forgot"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="form_submit d-flex flex-column">
                    <button type="submit">Login</button>
                    <span>Or</span>
                    <Link href="/signup">Continue to Sign up</Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </LoginLayout>
    </>
  );
};

export default LoginRoutes(Login);

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
