import React from "react";

const SideDrawer = ({ title, children }) => {
  return (
    <div
      className="offcanvas offcanvas-end commonSideDrawer"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">{title}</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">{children}</div>
    </div>
  );
};

export default SideDrawer;
