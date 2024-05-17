import useCommonApi from "@/hooks/useCommonApi";
import { useRouter } from "next/router";
import {  useSelector } from "react-redux";

const ButtonOutlined = ({ type,text, onClick, id, dataBsDismiss, ariaLabel }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const {addToCart} = useCommonApi();
  
  return (
    <div className="buttonOutlined"  onClick={() => addToCart(id)}>
      <button type={type ? type : "button"} onClick={onClick} data-bs-dismiss={dataBsDismiss} aria-label={ariaLabel}>{text}</button>
    </div>
  );
};

export default ButtonOutlined;
