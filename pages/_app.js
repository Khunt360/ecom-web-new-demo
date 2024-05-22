import "@/styles/bootstrap.css";
import "@/styles/style.css";
import "@/styles/responsive.css";
import 'font-awesome/css/font-awesome.min.css';
import "@/styles/owl-carousel.min.css";
import "@/styles/owl.theme.default.min.css";
import {
  manuale,
  montserrat,
  mulish,
  urbanist,
} from "@/styles/fonts";
import { Provider } from "react-redux";
import store from "@/store";
import { Bounce, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";

var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}
const ProgressBar = dynamic(() => import("@/Components/ProgressBar"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }
  }, []);

  return (
    <Provider store={store}>
      <ProgressBar />
      <div
        className={`${manuale.variable} ${montserrat.variable} ${mulish.variable} ${urbanist.variable}`}
      >
        <Component {...pageProps} />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Provider>
  );
}
