import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileLayout = (props) => {
  const pathname = usePathname();
  const Menu = [
    {
      name: "Dashboard",
      link: "#",
      activeLinks: [],
    },
    {
      name: "Account Settings",
      link: "/edit-profile",
      activeLinks: ["edit-profile"],
    },
    {
      name: "Address Book",
      link: "/address-book",
      activeLinks: ["address-book", "add-address", "edit-address"],
    },
    {
      name: "My Orders",
      link: "/my-orders",
      activeLinks: ["my-orders", "order-details"],
    },
    {
      name: "My Favorites",
      link: "/my-favorites",
      activeLinks: ["my-favorites"],
    },
  ];
  return (
    <>
      <div className="dashboard-nav">
        <div className="container-fluid">
          <ul className="nav nav-tabs">
            {Menu?.map((item, index) => {
              const isActive = item?.activeLinks.some((item) =>
                pathname?.includes(item)
              );
              return (
                <li className="nav-item" key={index}>
                  <Link
                    className={isActive ? "nav-link active" : "nav-link"}
                    href={item?.link}
                  >
                    {item?.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="dashboard-layout">{props?.children}</div>
    </>
  );
};

export default ProfileLayout;
