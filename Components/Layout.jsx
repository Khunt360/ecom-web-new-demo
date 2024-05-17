import Header from "./Header";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";
import { usePathname } from "next/navigation";
import TopHeader from "./TopHeader";

const Layout = (props) => {
  const pathname = usePathname();

  return (
    <>
      <TopHeader onPageClick={props?.onPageClick} />
      <Header onPageClick={props?.onPageClick} />
      <div className="children-components">{props.children}</div>
      {!(
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname?.includes("email-verification")
      ) && (
        <>
          <Footer />
          <ScrollTop />
        </>
      )}
    </>
  );
};

export default Layout;
