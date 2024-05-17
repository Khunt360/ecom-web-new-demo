import Head from "next/head";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FieldError from "@/Components/FieldError";
import { useCallback, useEffect, useState } from "react";
import ProfileLayout from "@/Components/ProfileLayout";
import userRoutes from "@/Components/Routes/UserRoutes";
import useCommonApi from "@/hooks/useCommonApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader, updateUser } from "@/redux/userSlice";
import { toast } from "react-toastify";
import axios from "@/APiSetUp/axios";
import { IoIosCloudUpload } from "react-icons/io";

const EditProfile = () => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState();
  const {
    countryList,
    stateList,
    getCountryList,
    getCount,
    getUserData,
    getCartList,
    profileImageUrl,
  } = useCommonApi();

  const { user } = useSelector((state) => state.user);

  const fetchData = useCallback(async () => {
    await Promise.all([
      getCountryList(),
      getUserData(),
      getCount(),
      getCartList(),
    ]);
  }, [getCountryList, getUserData, getCount, getCartList]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (
      user?.profile_image &&
      user?.profile_image !== null &&
      profileImageUrl
    ) {
      setProfileImage(profileImageUrl + "/" + user?.profile_image);
    }
  }, [user?.profile_image, profileImageUrl]);

  // const getState = (id) => {
  //   getStateList(id);
  // };

  const fileChangedHandler = (event, setFieldValue) => {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024;

    if (file && file.size > maxSize) {
      swal("Please select a file smaller than 2MB.", {
        icon: "warning",
      });
      event.target.value = null;
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setFieldValue("image", file);
        setProfileImage(reader.result);
      };
    }
  };
  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    country: user?.country || "",
    state: user?.state || "",
    city: user?.city || "",
    address: user?.address || "",
    postcode: user?.postcode || "",
    currentpassword: "",
    password: "",
    password_confirmation: "",
    eye1: false,
    eye2: false,
    eye3: false,
    image: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Please enter your name!"),
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
    postcode: Yup.string()
      .trim()
      .required("Please enter your postcode!")
      .matches(/^[1-9][0-9]{5}$/, "Invalid pin code!"),
    currentpassword: Yup.string().trim()
    //   .required("Please enter your current password!"),
    .min(8, "Please give at least 8 characters!"),
    password: Yup.string()
      .trim()
      .when("currentpassword", {
        is: (val) => val && val.length > 0,
        then: () =>
          Yup.string()
            .trim()
            .required("Please enter a password!")
            .min(8, "Please give at-least 8 character!"),
      })
      .min(8, "Please give at least 8 characters!"),
    password_confirmation: Yup.string()
      .trim()
      .when("currentpassword", {
        is: (val) => val && val.length > 0,
        then: () =>
          Yup.string()
            .trim()
            .oneOf([Yup.ref("password"), ""], "Passwords do not match!")
            .required("Please confirm your password!")
            .min(8, "Please give at-least 8 character!"),
      }),
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("country", values.country);
    formData.append("state", values.state);
    formData.append("city", values.city);
    formData.append("address", values.address);
    formData.append("postcode", values.postcode);
    formData.append("current_password", values.currentpassword);
    formData.append("new_password", values.password_confirmation);
    formData.append("profile_pic", values.image);

    dispatch(toggleLoader());
    axios.post("edit-profile", formData).then((res) => {
      dispatch(toggleLoader());
      if (res.data.result) {
        dispatch(updateUser(res?.data?.result?.userData));
        toast.success("Profile updated successfully.");
        window.scrollTo(0, 0);
      } else if (res.data.error) {
        toast.error(res.data.error.meaning);
        window.scrollTo(0, 0);
      }
    });
  };
  return (
    <>
      <Head>
        <title>Account Settings || Fast Buy</title>
        <meta name="description" content="Account Settings || Fast Buy"></meta>
      </Head>
      <ProfileLayout>
        <div className="dash-form ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, setFieldTouched, values }) => (
              <Form>
                <div className="row">
                  <h3>Basic Details</h3>
                  <div className="col-12 col-sm-12">
                    <div className="cont-frm-box">
                      <Field type="text" name="name" />
                      <label htmlFor className={values?.name && `label-value`}>
                        Name
                      </label>
                      <ErrorMessage name="name" component={FieldError} />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="cont-frm-box">
                      <Field type="text" name="phone" />
                      <label htmlFor className={values?.phone && `label-value`}>
                        Phone Number
                      </label>
                      <ErrorMessage name="phone" component={FieldError} />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="cont-frm-box">
                      <Field type="text" name="email" />
                      <label htmlFor className={values?.email && `label-value`}>
                        Email
                      </label>
                      <ErrorMessage name="email" component={FieldError} />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12">
                    <div className="uploadImg">
                      <input
                        autoComplete="off"
                        accept="image/*"
                        onChange={(e) => {
                          fileChangedHandler(e, setFieldValue);
                          setFieldTouched("image", true);
                        }}
                        name="image"
                        id="filer_input2"
                        multiple="multiple"
                        type="file"
                      />
                      <h4 className="d-flex flex-column">
                        Click here to upload/change your photo
                        <span>Supported file : Jpg and Png</span>
                      </h4>
                      {profileImage ? (
                        <img src={profileImage} alt="" />
                      ) : (
                        <IoIosCloudUpload fontSize={"48px"} />
                      )}
                    </div>
                  </div>
                  <h3>Address Information</h3>
                  <div className="col-12 col-sm-12">
                    <div className="cont-frm-box position-relative">
                      <Field as="select" name="country">
                        <option value="">select</option>
                        {countryList?.map((item, index) => {
                          return (
                            <option value={item?.name} key={index}>
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
                    <div className="cont-frm-box">
                      <Field type="text" name="city" />
                      <label htmlFor className={values?.city && `label-value`}>
                        City
                      </label>
                      <ErrorMessage name="city" component={FieldError} />
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
                        Full Address
                      </label>
                      <ErrorMessage name="address" component={FieldError} />
                    </div>
                  </div>
                  <h3 className="mt-4">Change Password</h3>
                  <div className="col-12 col-sm-4">
                    <div className="cont-frm-box position-relative">
                      <Field
                        type={values.eye1 ? "text" : "password"}
                        name="currentpassword"
                      />
                      <label
                        htmlFor
                        className={values?.currentpassword && `label-value`}
                      >
                        Current Password
                      </label>
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
                      <ErrorMessage
                        name="currentpassword"
                        component={FieldError}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="cont-frm-box position-relative">
                      <Field
                        type={values.eye2 ? "text" : "password"}
                        name="password"
                        disabled={!values.currentpassword}
                      />
                      <label
                        htmlFor
                        className={values?.password && `label-value`}
                      >
                        New Password
                      </label>
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
                      <ErrorMessage name="password" component={FieldError} />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="cont-frm-box position-relative">
                      <Field
                        type={values.eye3 ? "text" : "password"}
                        name="password_confirmation"
                        disabled={!values.currentpassword}
                      />
                      <label
                        htmlFor
                        className={
                          values?.password_confirmation && `label-value`
                        }
                      >
                        Confirm Password
                      </label>
                      <span
                        className="input-group-addon"
                        name="eye3"
                        onClick={() => {
                          setFieldValue("eye3", !values.eye3);
                        }}
                      >
                        <img
                          src={
                            !values.eye3
                              ? `/images/eye.svg`
                              : `/images/eye-off.webp`
                          }
                          alt="eye"
                        />
                      </span>
                      <ErrorMessage
                        name="password_confirmation"
                        component={FieldError}
                      />
                    </div>
                  </div>
                  <div className="form_submit d-flex flex-column mt-4">
                    <button type="submit">Save all changes</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </ProfileLayout>
    </>
  );
};

export default userRoutes(EditProfile);
