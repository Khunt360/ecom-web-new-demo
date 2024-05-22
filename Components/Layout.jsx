import Header from "./Header";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";
import { usePathname } from "next/navigation";

const Layout = (props) => {
  const pathname = usePathname();

  return (
    <>
      <Header categoryList={props.categoryList} />
      <div className="children-components">{props.children}</div>
      {!(
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname?.includes("email-verification")
      ) && (
        <>
          <Footer footerData={props.footerData} />
          <ScrollTop />
        </>
      )}
    </>
  );
};

export default Layout;
