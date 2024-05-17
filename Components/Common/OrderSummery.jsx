import React from "react";
import ButtonOutlined from "./ButtonOutlined";
import ButtonContainer from "./ButtonContainer";
import { useRouter } from "next/router";
import Payment from "../Payment";

const OrderSummery = ({
  data,
  setIsCardFilled,
  title,
  buttonOutlinedText,
  buttonContainerText,
  isDelivery,
  buttonOutlinedLink,
  buttonContainerLink,
  containerType,
  outlinedType,
  payOut,
  order,
  addressBookId,
  isCard
}) => {
  const router = useRouter();
  return (
    <div className="orderSummary">
      <h1>{title}</h1>
      <div className="orderSummaryContent">
        <p>
          <span>Subtotal ({data?.total_item} items) </span>
          <b>Rs. {data?.total_before_discount}</b>
        </p>
        {/* <p>
          <span>Shipping Charges </span>
          <b>Rs. 500.00</b>
        </p> */}
        <p>
          <span>Discount </span>
          <b>Rs. {(data?.total_before_discount - data?.total_after_discount).toFixed(2)}</b>
        </p>
        <div className="orderTotal">
          <p>
            <span>Total payable amount </span>
            <b>Rs. {data?.total_after_discount}</b>
          </p>
        </div>
      </div>
      <div className="buttons">
        {buttonContainerText && (
          <ButtonContainer
            type={containerType}
            text={buttonContainerText}
            dataBsDismiss={isDelivery ? "" : "offcanvas"}
            ariaLabel={isDelivery ? "" : "Close"}
            onClick={
              buttonContainerLink
                ? () => router.push(buttonContainerLink)
                : undefined
            }
          />
        )}
        {buttonOutlinedText && (
          <ButtonOutlined
            type={outlinedType}
            text={buttonOutlinedText}
            dataBsDismiss={isDelivery ? "" : "offcanvas"}
            ariaLabel={isDelivery ? "" : "Close"}
            onClick={
              buttonOutlinedLink
                ? () => router.push(buttonOutlinedLink)
                : undefined
            }
          />
        )}
      </div>
      {/* {isDelivery && (
        <div className="delivery">
          <img src={"/images/delivery.webp"} alt="delivery" />
          <span>Delivery: Monday, 11 Mar 2024.</span>
        </div>
      )} */}
    </div>
  );
};

export default OrderSummery;
