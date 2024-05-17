import AddressBox from "@/Components/Common/AddressBox";
import CartItemBox from "@/Components/Common/CartItemBox";
import CommonBreadcrump from "@/Components/Common/CommonBreadcrump";
import OrderSummery from "@/Components/Common/OrderSummery";
import WhyChoose from "@/Components/Home/WhyChoose";
import Head from "next/head";
import React, { useState } from "react";

const addressData = [
  {
    address_name: "Shipping Information",
    def: false,
    name: "Rabin Chatterjee",
    phone: "+91 9876543210",
    email: "rabin-emailaddress123@gmail.com",
    address:
      " Bagnan kalibari, tantipara, Bagnan, Howrah West Bengal, India, 412000",
  },
  {
    address_name: "Billing Address",
    def: false,
    name: "Rabin Chatterjee",
    phone: "+91 9876543210",
    email: "rabin-emailaddress123@gmail.com",
    address:
      " Bagnan kalibari, tantipara, Bagnan, Howrah West Bengal, India, 412000",
  },
];

const orderData = [
  {
    name: "Kanjivaram Designer Saree",
    color: "Yellow",
    total: "29,725.00",
  },
  {
    name: "Mustard Floral Printed Satin Designer Saree",
    color: "Red",
    total: "12,500.00",
  },
];

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  return (
    <>
      <Head>
        <title>Place Order || Fast Buy</title>
        <meta name="description" content="Place Order || Fast Buy"></meta>
      </Head>
      <CommonBreadcrump
        title="Place Order"
        sub1="Trending Collection"
        link1="#"
        sub2="Cart"
        link2="#"
        sub3="Checkout"
        link3="#"
      />
      <div className="addressLayout placeOrderLay">
        <div className="addressLayoutHead">
          <h2>Place Order</h2>
        </div>
        <div className="row">
          <div className="col-12 col-lg-7">
            {addressData?.map((item, index) => {
              return <AddressBox key={index} data={item} isEdit={true}/>;
            })}
            <div className="paymentMethod">
              <h3> Payment Method</h3>
              <span>All transactions are completely secure and encrypted</span>
              <div className="pay-op-box">
                <div
                  className={`quote-radio custom_radio ${
                    paymentMethod === "C" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="featured-1"
                    name="featured"
                    value="C"
                    checked={paymentMethod === "C"}
                    onChange={() => {
                      setPaymentMethod("C");
                    }}
                  />
                  <label for="featured-1">Cash on Delivery (COD)</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="cart cartMain">
              <h3>Product Information</h3>
              <div className="cartItem">
                {orderData?.map((item, index) => {
                  return (
                    <CartItemBox
                      key={index}
                      data={item}
                      isQtyFixed={true}
                      isDelete={false}
                    />
                  );
                })}
              </div>
              <OrderSummery
                title="PAYMENT DETAIL"
                buttonContainerText="Confirm & Pay"
                isDelivery
              />
            </div>
          </div>
        </div>
      </div>
      <WhyChoose />
    </>
  );
};

export default PlaceOrder;
