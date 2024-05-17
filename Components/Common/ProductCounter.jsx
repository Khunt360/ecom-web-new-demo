import useCommonApi from "@/hooks/useCommonApi";
import React, { useState } from "react";
// import { useAppContext } from "../../Context/context";
// import axios from "../../APiSetUp/axios";
// import swal from "sweetalert";

function ProductCounter({ qty,product }) {
  
  const {
    addToCart,
    removeToCart
  } = useCommonApi();

  return (
    <div className="quant">
      <div className="quant-inr d-flex justify-content-start align-items-center">
        <div className="quantity buttons_added">
          <input
            type="button"
            defaultValue="-"
            className="minus"
            onClick={() => {
              removeToCart(product?.id);
            }}
          />
          <input
            type
            step={1}
            min={1}
            max
            name="quantity"
            title="Qty"
            className="input-text qty text"
            size={4}
            pattern
            inputMode
            value={qty}
          />
          <input
            type="button"
            defaultValue="+"
            className="plus"
            onClick={() => addToCart(product?.get_product_details?.id)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCounter;
