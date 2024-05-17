import React from "react";

const FormTitleSubTitle = ({ title, subTitle }) => {
  return (
    <div className="formTitleSubTitle">
      <h3>{title}</h3>
      <p>{subTitle}</p>
    </div>
  );
};

export default FormTitleSubTitle;
