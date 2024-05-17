import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "@/APiSetUp/axios";
import { toggleLoader } from "@/redux/userSlice";
import Link from "next/link";

function EmailVerification() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = useCallback(
    (vCode) => {
      if (vCode) {
        let data = {
          params: {
            random: vCode,
          },
        };
        dispatch(toggleLoader());
        axios.post("/verifyUser", data).then((res) => {
          dispatch(toggleLoader());
          if (res?.data?.result) {
            setType("S");
            setMessage(res?.data?.result?.status?.meaning);
          } else if (res.data.error) {
            setType("E");
            setMessage(res?.data?.error?.meaning);
          }
        });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    if(router?.query?.code){
      handleSubmit(router?.query?.code);
    }
  }, [router?.query?.code, handleSubmit]);

  return (
    <>
      <Head>
        <title>Email Verification || Fast Buy</title>
        <meta
          name="description"
          content="Email verification || Fast Buy"
        ></meta>
      </Head>
      {type === "S" && (
        <div className="verification">
          <img src="/images/success.webp" alt="success" />
          <h2>Success !</h2>
          <p>{message}</p>
          <Link href="/login">Go to Login</Link>
        </div>
      )}
      {type === "E" && (
        <div className="verification">
          <img src="/images/failure.webp" alt="error" />
          <h2>Error</h2>
          <p>{message}</p>
          <Link href="/login">Go to Login</Link>
        </div>
      )}
    </>
  );
}

export default EmailVerification;
