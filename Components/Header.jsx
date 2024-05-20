import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout, toggleLoader } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { staticPageRoute } from "@/lib/common";
import SideDrawer from "./Common/SideDrawer";
import CartItemBox from "./Common/CartItemBox";
import OrderSummery from "./Common/OrderSummery";
import useCommonApi from "@/hooks/useCommonApi";
import { FaAngleRight } from "react-icons/fa6";
import NodataFound from "./NodataFound";
import Image from "next/image";

const Header = () => {
  let navbarRef = useRef();
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { cartList, count } = useSelector((state) => state.cart);
  const [scrollPosition, setScrollPosition] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const { getUserData, deleteFromCart, getCartList, getCount, getCategoryList, categoryList } = useCommonApi();
  const fetchData = useCallback(async () => {
    await Promise.all([getCategoryList()]);
  }, [getCategoryList]);

  useEffect(() => {
    fetchData()
    if (user) {
      getUserData();
    }
    if (router?.pathname !== "/login") {
      getCartList();
      getCount();
    }
  }, []);

  const handleNavLinkClick = () => {
    if (navbarRef.current && navbarRef.current.classList.contains("show")) {
      const navbarToggler = document.querySelector("button.navbar-toggler");
      navbarToggler.click();
    }
  };
  const toggleMenu = (event) => {
    event.stopPropagation();
    handleNavLinkClick();
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const OnLogout = async () => {
    closeMenu();
    swal({
      text: "Are you sure you want to logout?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((isConfirmed) => {
      if (isConfirmed) {
        dispatch(logout());
        const currentRoute = router.pathname;
        const isStaticRoute = staticPageRoute.some(route => currentRoute.startsWith(route));
        if (isStaticRoute) {
          router.push("/login");
        }
      }
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        !event.target.classList.contains("navbar-toggler")
      ) {
        handleNavLinkClick();
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //hydration error handle hack
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const HeaderAfterLoginMenu = () => {
    return (
      <div className="after_login_user_dropdown">
        <a className="user_llk" onClick={toggleMenu}>
          <span>
            <Image
        loading='lazy'
        unoptimized 
              src={
                user?.profile_image && user?.image_path
                  ? user?.image_path + "/" + user?.profile_image
                  : "/images/default.webp"
              }
              alt="avtar"
            />
          </span>
        </a>
        <div
          className="show01 rr001"
          ref={menuRef}
          style={{
            maxHeight: menuOpen ? "500px" : "0",
            opacity: menuOpen ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.6s ease-in-out, opacity 0.4s ease-in-out",
          }}
        >
          <ul>
            <li>
              <Link href="#" onClick={closeMenu}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/edit-profile" onClick={closeMenu}>
                Account Settings
              </Link>
            </li>
            <li>
              <Link href="/address-book" onClick={closeMenu}>
                Address Book
              </Link>
            </li>
            <li>
              <Link href="/my-orders" onClick={closeMenu}>
                My Orders
              </Link>
            </li>
            <li>
              <Link href="/my-favorites" onClick={closeMenu}>
                My Favorites
              </Link>
            </li>
            <li>
              <Link href="#" onClick={OnLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const HeaderMenus = ({
    navbarRef,
    openMenu,
    setOpenMenu,
    handleNavLinkClick,
    router
  }) => {
    return (
      <>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          ref={navbarRef}
        >
          <ul className="navbar-nav position-relative">
            <li className="nav-item category-main" onMouseEnter={() => {
              setOpenMenu(true);
            }}>
              <a className="nav-link">
                Browse Categories &nbsp;
                <Image
        loading='lazy'
        unoptimized 
                  src="/images/down-menu-arrow.webp"
                  alt=""
                  height={"auto"}
                  style={{ width: "auto" }}
                />
              </a>
              <div className="category-list">
              <ul
                className="browser-menu category-menu"
                onMouseEnter={() => {
                  setOpenMenu(true);
                }}
                onMouseLeave={() => {
                  setOpenMenu(false);
                }}
              >
                {categoryList?.map((ele, i) => {
                  return (
                    <li className="nav-item" key={i}>
                      <Link
                        className="nav-link category-subMenu"
                        href={`/search-product?categoryId=${ele?.id}`}
                        onClick={handleNavLinkClick}
                      >
                        {ele?.name?.split(" ")?.[0]} <span><FaAngleRight /></span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              </div>
            </li>
            {/* {openMenu && ( */}

            {/* )} */}
            {categoryList?.map((ele, i) => {
              if (i < 4) {
                return (
                  <li className="nav-item" key={i}>
                    <Link className="nav-link" href={`/search-product?categoryId=${ele?.id}`} onClick={handleNavLinkClick}>
                      {ele?.name?.split(" ")?.[0]}
                    </Link>
                  </li>
                )
              }
            })}
            {!user && (
              <>
                <li className="nav-item mobile-menu">
                  <Link
                    className="nav-link"
                    href="/login"
                    onClick={handleNavLinkClick}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item mobile-menu">
                  <Link
                    className="nav-link"
                    href="/signup"
                    onClick={handleNavLinkClick}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav icon-nav">
            {!user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/login"
                  onClick={handleNavLinkClick}
                >
                  <Image
        loading='lazy'
        unoptimized  src="/images/user.webp" alt="" />
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className="nav-link"
                href="/search-product"
                onClick={handleNavLinkClick}
              >
                <Image
        loading='lazy'
        unoptimized  src="/images/search.webp" alt="" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link countBox" href="/my-favorites" onClick={handleNavLinkClick}>
                <Image
        loading='lazy'
        unoptimized  src="/images/heart.webp" alt="" />
                <div className="count">{count?.product_count || 0}</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link countBox"
                href="/my-favorites"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
                onClick={handleNavLinkClick}
              >
                <Image
        loading='lazy'
        unoptimized  src="/images/shopping-cart.webp" alt="" />
                <div className="count">{count?.cart_count || 0}</div>
              </Link>
            </li>
            {user && <HeaderAfterLoginMenu />}
          </ul>
        </div>
      </>
    );
  };

  return (
    <div>
      <header className={scrollPosition > 0 ? "scrolled" : ""}>
        <div className="container container-new headerContainer">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" href="/">
              <Image
        loading='lazy'
        unoptimized  src="/images/logo.webp" alt="" />
            </Link>

            <div className="main-menu">
              <ul className="mobile-menu-icon">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/search-product"
                    onClick={handleNavLinkClick}
                  >
                    <Image
        loading='lazy'
        unoptimized  src="/images/search.webp" alt="" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link countBox"
                    href="/my-favorites"
                    onClick={handleNavLinkClick}
                  >
                    <Image
        loading='lazy'
        unoptimized  src="/images/heart.webp" alt="" />
                    <div className="count">{count?.product_count || 0}</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link countBox"
                    href="#"
                    onClick={handleNavLinkClick()}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    <Image
        loading='lazy'
        unoptimized  src="/images/shopping-cart.webp" alt="" />
                    <div className="count">{count?.cart_count || 0}</div>
                  </Link>
                </li>
                {user && <HeaderAfterLoginMenu />}
              </ul>
              <div className="head-left-mobile">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="header-menu-md">
                  <HeaderMenus
                    navbarRef={navbarRef}
                    openMenu={openMenu}
                    handleNavLinkClick={handleNavLinkClick}
                    setOpenMenu={setOpenMenu}
                    router={router}
                  />
                </div>
              </div>
            </div>
            <div className="header-menu-sm">
              <HeaderMenus
                navbarRef={navbarRef}
                openMenu={openMenu}
                handleNavLinkClick={handleNavLinkClick}
                setOpenMenu={setOpenMenu}
              />
            </div>
          </nav>
        </div>
      </header>
      <SideDrawer title="Cart">
        <Cart deleteFromCart={deleteFromCart} cartList={cartList} />
      </SideDrawer>
    </div>
  );
};

const Cart = ({ deleteFromCart, cartList }) => {
  return (
    <>
      {cartList?.get_cart_details?.length > 0 ? <div className="cart">
        <div className="cartItem">
          {cartList?.get_cart_details?.map((item, index) => {
            return (
              <CartItemBox
                key={index}
                data={item}
                isQtyFixed={false}
                isDelete={true}
                removeItem={deleteFromCart}
              />
            );
          })}
        </div>
        <OrderSummery
          data={cartList}
          title="Checkout"
          buttonOutlinedLink="/search-product"
          buttonContainerLink="/checkout"
          buttonOutlinedText="Continue Shopping"
          buttonContainerText="Checkout"
        />
      </div> : <NodataFound msg={"Your cart is currently empty."} />}
    </>
  );
};
export default Header;
