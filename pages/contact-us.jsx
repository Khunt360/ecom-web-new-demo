import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FieldError from "@/Components/FieldError";
import WhyChoose from "@/Components/Home/WhyChoose";
import CommonBanner from "@/Components/Common/CommonBanner";
import { useDispatch } from "react-redux";
import { toggleLoader } from "@/redux/userSlice";
import { toast } from "react-toastify";
import axios from "@/APiSetUp/axios";
import useCommonApi from "@/hooks/useCommonApi";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import SEOPart from "@/Components/SEOPart";
import { SeoData } from "@/SEOData/SeoData";

const ContactUs = () => {
  const dispatch = useDispatch();
  const { footerData, getFooter } = useCommonApi();
  const [banner, setBanner] = useState();

  const getContact = useCallback(() => {
    dispatch(toggleLoader());
    axios.post("contact-us-data").then((res) => {
      dispatch(toggleLoader());
      if (res?.data?.result) {
        setBanner(res?.data?.result);
      } else if (res?.data?.error) {
        toast.error(res?.data?.error?.meaning);
        window.scrollTo(0, 0);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    getFooter();
    getContact();
  }, [getFooter, getContact]);

  let phone1;
  let phone2;

  const hasSlash = footerData?.phone_no?.includes("/");

  if (hasSlash) {
    // If there is a slash, split the phone number into two parts
    const parts = footerData?.phone_no?.split(" / ");
    phone1 = parts[0].trim(); // The first phone number
    phone2 = parts[1].trim();
  } else {
    // If there is no slash, keep the original phone number
    phone1 = footerData?.phone_no?.trim();
    phone2 = null;
  }

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
    subject: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Please enter your full name!"),
    subject: Yup.string().trim().required("Please enter subject!"),
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
    message: Yup.string().trim().required("Please enter a message!"),
  });

  const onSubmit = (values, actions) => {
    const data = {
      params: {
        full_name: values?.name,
        email: values?.email,
        phone_number: values?.phone,
        message: values?.message,
        subject: values?.subject,
      },
    };
    dispatch(toggleLoader());
    axios.post("submit-contact", data).then((res) => {
      dispatch(toggleLoader());
      if (res?.data?.result) {
        toast.success(res?.data?.result?.status?.meaning);
        actions.resetForm();
        window.scrollTo(0, 0);
      } else if (res?.data?.error) {
        toast.error(res?.data?.error?.meaning);
        window.scrollTo(0, 0);
      }
    });
  };
  return (
    <>
      <SEOPart
        data={SeoData?.contact}
        imgUrl={banner?.image}
        image={banner?.banner?.image}
      />
      <CommonBanner
        img={banner?.banner?.image}
        imgUrl={banner?.image}
        title={banner?.banner?.heading}
        desc={banner?.banner?.description}
        // link="easybuy@gmail.com"
      />
      <div className="contact">
        <div className="container container-new">
          <div className="row">
            <div className="col-12 col-md-4 order-2 order-md-1">
              <div className="contact-left">
                <ul>
                  <li>
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.0005 8C13.3808 8 14.5 9.11924 14.5 10.5005C14.5 11.8808 13.3808 13 12.0005 13C10.6192 13 9.5 11.8808 9.5 10.5005C9.5 10.0245 9.63291 9.57964 9.86366 9.20096"
                          stroke="#E9332B"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.9995 21C11.9995 21 4.5 15.8984 4.5 10.5633C4.5 6.38664 7.8571 3 11.9995 3C16.1419 3 19.5 6.38664 19.5 10.5633C19.5 14.1812 16.6019 17.6917 14.3626 19.5768"
                          stroke="#E9332B"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <h4>
                      Address
                      <p>{footerData?.address}</p>
                    </h4>
                  </li>
                  <li>
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.5317 12.4724C15.5208 16.4604 16.4258 11.8467 18.9656 14.3848C21.4143 16.8328 22.8216 17.3232 19.7192 20.4247C19.3306 20.737 16.8616 24.4943 8.1846 15.8197C-0.493478 7.144 3.26158 4.67244 3.57397 4.28395C6.68387 1.17385 7.16586 2.58938 9.61449 5.03733C12.1544 7.5765 7.54266 8.48441 11.5317 12.4724Z"
                          stroke="#E9332B"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <h4>
                      <p>&nbsp;</p>
                      Email Us
                      <p className="d-flex flex-column">
                        <Link href={`mailto:${footerData?.email}`}>
                          {footerData?.email}
                        </Link>
                        {/* <a href="tel:+1 9876543210">+1 9876543210</a> */}
                      </p>
                    </h4>
                  </li>
                  <li>
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.9014 8.85115L13.4581 12.4642C12.6186 13.1302 11.4375 13.1302 10.598 12.4642L6.11719 8.85115"
                          stroke="#E9332B"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.9089 21C19.9502 21.0084 22 18.5095 22 15.4384V8.57001C22 5.49883 19.9502 3 16.9089 3H7.09114C4.04979 3 2 5.49883 2 8.57001V15.4384C2 18.5095 4.04979 21.0084 7.09114 21H16.9089Z"
                          stroke="#E9332B"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <h4>
                      <p>&nbsp;</p>
                      Call Us
                      <p className="d-flex">
                        {/* <a href="mailto:customer-support-fastbuy123@gmail.com">
                          customer-support-fastbuy123@gmail.com
                        </a> */}
                        {phone1 && <Link href={`tel:${phone1}`}>{phone1}</Link>}
                        {phone2 && (
                          <Link href={`tel:${phone2}`}>{" / " + phone2}</Link>
                        )}
                      </p>
                    </h4>
                  </li>
                </ul>
                <div className="contact-social">
                  <h5>Connect</h5>
                  <div className="d-flex">
                    <a
                      href={footerData?.facebook_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/images/facebook.webp" alt="fb" />
                    </a>
                    <a
                      href={footerData?.instagram_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/images/instagram.webp" alt="instagram" />
                    </a>
                    <a
                      href={footerData?.twitter_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/images/twitter.webp" alt="twitter" />
                    </a>
                    <a
                      href={footerData?.pinterest_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/images/pinterest.webp" alt="pinterest" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 order-1 order-md-2">
              <div className="contact-lay">
                <div className="addressLayoutHead">
                  <h1>Get in touch</h1>
                  <p>Reach Out to Us for Saree Inquiries and Assistance</p>
                </div>
                <div className="cont-right">
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-8">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                      >
                        {({ values }) => (
                          <Form>
                            <div className="row">
                              <div className="col-12 col-sm-12">
                                <div className="cont-frm-box">
                                  <Field type="text" name="name" />
                                  <label
                                    htmlFor
                                    className={values?.name && `label-value`}
                                  >
                                    Full Name
                                  </label>
                                  <ErrorMessage
                                    name="name"
                                    component={FieldError}
                                  />
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
                                  <ErrorMessage
                                    name="phone"
                                    component={FieldError}
                                  />
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
                                  <ErrorMessage
                                    name="email"
                                    component={FieldError}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-12">
                                <div className="cont-frm-box">
                                  <Field type="text" name="subject" />
                                  <label
                                    htmlFor
                                    className={values?.subject && `label-value`}
                                  >
                                    Subject
                                  </label>
                                  <ErrorMessage
                                    name="subject"
                                    component={FieldError}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-sm-12">
                                <div className="cont-frm-box">
                                  <Field as="textarea" name="message" />
                                  <label
                                    htmlFor
                                    className={values?.message && `label-value`}
                                  >
                                    Write your message
                                  </label>
                                  <ErrorMessage
                                    name="message"
                                    component={FieldError}
                                  />
                                </div>
                              </div>
                              <div className="form_submit d-flex flex-column">
                                <button type="submit">Send Message</button>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                    <div className="col-12 col-md-12 col-lg-4">
                      <iframe
                        className="cont-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58945.632128985955!2d88.38038659417539!3d22.575287799080506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275c719156233%3A0x696fbc623d90d6a3!2sBidhannagar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1711119019549!5m2!1sen!2sin"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhyChoose />
    </>
  );
};

export default ContactUs;
