import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { toggleLoader } from "@/redux/userSlice";
import { toast } from "react-toastify";
import axios from "@/APiSetUp/axios";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AddressBox = ({
  data,
  isDelete,
  isEdit,
  setAddressData,
  addressBookId,
  setAddressBookId,
}) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const deleteAddress = (id) => {
    var data = {
      params: {
        address_id: id,
      },
    };
    swal({
      text: "Are you sure you want to delete this address?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
      className: "war005",
    }).then((isConfirmed) => {
      if (isConfirmed) {
        dispatch(toggleLoader());
        axios.post("address-delete", data).then((res) => {
          dispatch(toggleLoader());
          if (res.data.result) {
            setAddressData(res?.data?.result?.address);
            toast.success(res.data.result.status);
            window.scrollTo(0, 0);
          } else if (res?.data?.error) {
            toast.error(res?.data?.error?.meaning);
            window.scrollTo(0, 0);
          }
        });
      }
    });
  };
  const handleClick = () => {
    if (pathname === "/checkout") {
      setAddressBookId(data?.id);
    }
  };
  return (
    <div className="add-box">
      <div className="d-flex justify-content-between align-content-center">
        <h3>
          {data?.address_title}{" "}
          {data?.default_shipping_address === "Y" && (
            <span className="active">(Default Shipping Address)</span>
          )}
        </h3>
        <div className="d-flex justify-content-start">
          {isDelete && (
            <acronym title="Delete">
              <Link href="#" onClick={() => deleteAddress(data?.id)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.34 1.99921C19.73 1.99921 22 4.37921 22 7.91921V16.0902C22 19.6202 19.73 21.9992 16.34 21.9992H7.67C4.28 21.9992 2 19.6202 2 16.0902V7.91921C2 4.37921 4.28 1.99921 7.67 1.99921H16.34ZM15.01 8.97021C14.67 8.62921 14.12 8.62921 13.77 8.97021L12 10.7492L10.22 8.97021C9.87 8.62921 9.32 8.62921 8.98 8.97021C8.64 9.31021 8.64 9.87021 8.98 10.2092L10.76 11.9902L8.98 13.7602C8.64 14.1102 8.64 14.6602 8.98 14.9992C9.15 15.1692 9.38 15.2602 9.6 15.2602C9.83 15.2602 10.05 15.1692 10.22 14.9992L12 13.2302L13.78 14.9992C13.95 15.1802 14.17 15.2602 14.39 15.2602C14.62 15.2602 14.84 15.1692 15.01 14.9992C15.35 14.6602 15.35 14.1102 15.01 13.7702L13.23 11.9902L15.01 10.2092C15.35 9.87021 15.35 9.31021 15.01 8.97021Z"
                    fill="black"
                  />
                </svg>
              </Link>
            </acronym>
          )}
          {isEdit && (
            <acronym title="Edit">
              <Link href={`edit-address/${data?.id}`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M19.9908 18.9532H14.2965C13.7409 18.9532 13.2891 19.4123 13.2891 19.9766C13.2891 20.5421 13.7409 21 14.2965 21H19.9908C20.5463 21 20.9982 20.5421 20.9982 19.9766C20.9982 19.4123 20.5463 18.9532 19.9908 18.9532Z"
                    fill="black"
                  />
                  <path
                    d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z"
                    fill="black"
                  />
                  <path
                    opacity="0.4"
                    d="M18.1213 8.66544L17.081 9.96401C16.9763 10.0962 16.7879 10.1177 16.6578 10.0124C15.3932 8.98901 12.155 6.36285 11.2566 5.63509C11.1254 5.52759 11.1074 5.33625 11.2132 5.20295L12.2164 3.95706C13.1265 2.78534 14.7138 2.67784 15.9942 3.69906L17.4652 4.87078C18.0684 5.34377 18.4705 5.96726 18.6081 6.62299C18.7668 7.3443 18.5975 8.0527 18.1213 8.66544Z"
                    fill="black"
                  />
                </svg>
              </Link>
            </acronym>
          )}
        </div>
      </div>
      <acronym title={pathname === "/checkout" ? "Select" : ""} onClick={() => handleClick()}>
        <div
          className={`d-flex flex-column add-cont ${
            addressBookId === data?.id && `select-address`
          }`}
          style={{ cursor: pathname === "/checkout" ? "pointer" : "auto" }}
        >
          <p>{data?.first_name + " " + data?.last_name}</p>
          <p>{data?.email}</p>
          <p>{data?.mobile}</p>
          <p>
            {data?.address}, {data?.city}, {data?.state},{" "}
            {data?.get_country_name?.name} - {data?.postcode}
          </p>
        </div>
      </acronym>
    </div>
  );
};

export default AddressBox;
