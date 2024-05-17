import SideBar from "./SideBar";

function InnerLayout(props) {
  return (
    <div className="profile-cont position-relative">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <SideBar />
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default InnerLayout;
