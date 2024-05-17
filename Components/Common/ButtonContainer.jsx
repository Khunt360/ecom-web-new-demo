import React from "react";

const ButtonContainer = ({ type,text, onClick,dataBsDismiss,ariaLabel }) => {
  return (
    <div className="buttonContainer" >
      <button type={type ? type :"button"} onClick={onClick} data-bs-dismiss={dataBsDismiss} aria-label={ariaLabel}>{text}</button>
    </div>
  );
};

export default ButtonContainer;
