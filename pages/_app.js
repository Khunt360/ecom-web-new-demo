
import Layout from "@/Components/Layout";
import { Provider } from "react-redux";
import store from "@/store";
import Loader from "@/Components/Loader";
import { Bounce, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";

var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
  window.bootstrap = require("bootstrap");
  window.popper = require("popper.js");
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
      <Loader />
      <Layout>
        <Component {...pageProps} />
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
      </Layout>
    </Provider>
  );
}
