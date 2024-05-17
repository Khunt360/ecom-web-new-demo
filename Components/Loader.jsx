import { useSelector } from "react-redux";

function Loader() {
  const { loader } = useSelector((state) => state.user);
  return (
    <>
      {loader ? (
        <div className="loading">
          <div className="uil-ring-css" style={{ transform: "scale(0.79)" }}>
            <div></div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Loader;
