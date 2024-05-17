import AddressBox from "@/Components/Common/AddressBox";
import ProfileLayout from "@/Components/ProfileLayout";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import userRoutes from "@/Components/Routes/UserRoutes";
import useCommonApi from "@/hooks/useCommonApi";
import NodataFound from "@/Components/NodataFound";

const AddressBook = () => {
  const { addressData, setAddressData, getAddressBook } = useCommonApi();

  useEffect(() => {
    getAddressBook();
  }, [getAddressBook]);

  return (
    <>
      <Head>
        <title>Address Book || Fast Buy</title>
        <meta name="description" content="Address Book || Fast Buy"></meta>
      </Head>
      <ProfileLayout>
        <div className="dash-form">
          <div className="addressLayoutHead">
            <h1>Address Book</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <Link href="/add-address">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_607_864)">
                  <path
                    d="M8.5013 15.5834C12.4133 15.5834 15.5846 12.412 15.5846 8.50002C15.5846 4.588 12.4133 1.41669 8.5013 1.41669C4.58928 1.41669 1.41797 4.588 1.41797 8.50002C1.41797 12.412 4.58928 15.5834 8.5013 15.5834Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.5 5.66669V11.3334"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.66797 8.5H11.3346"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_607_864">
                    <rect width="17" height="17" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Add address
            </Link>
          </div>
          {addressData?.length>0 ?
          <>
          {addressData?.map((item, index) => {
            return (
              <AddressBox
                key={index}
                data={item}
                isEdit={true}
                isDelete={true}
                setAddressData={setAddressData}
              />
            );
          })}
          </>
          :
          <NodataFound msg="Currently you have no address saved in your account." />
          }
        </div>
      </ProfileLayout>
    </>
  );
};

export default userRoutes(AddressBook);
