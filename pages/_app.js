import "@/styles/bootstrap.css";
import "@/styles/style.css";
import "@/styles/responsive.css";
import "@/styles/font-awesome.css";
import "@/styles/owl-carousel.min.css";
import "@/styles/owl.theme.default.min.css";
import Layout from "@/Components/Layout";
import { Provider } from "react-redux";
import store from "@/store";
import Loader from "@/Components/Loader";
import { Bounce, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import { useEffect } from "react";

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
