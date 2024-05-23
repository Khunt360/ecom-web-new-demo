import { accountPageRoute } from "@/lib/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import useCommonApi from "@/hooks/useCommonApi";
import Image from "next/image";

function Footer({footerData}) {
  const { auth_token } = useSelector((state) => state.user);
  // const { footerData, getFooter } = useCommonApi();

  const pathname = usePathname();
  const d = new Date();
  let year = d.getFullYear();

  // useEffect(() => {
  //   getFooter();
  // }, [getFooter]);

  //hydration error handle hack
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const isRouteMatched = accountPageRoute.some((route) =>
    pathname?.includes(route)
  );

  let phone1;
  let phone2;

  const hasSlash = footerData?.phone_no?.includes("/");

  if (hasSlash) {
    // If there is a slash, split the phone number into two parts
    const parts = footerData?.phone_no?.split(" / ");
    phone1 = parts[0].trim(); // The first phone number
    phone2 = parts[1].trim();
  } else {
    // If there is no slash, keep the original phone number
    phone1 = footerData?.phone_no?.trim();
    phone2 = null;
  }

  return (
    <footer>
      {!isRouteMatched && (
        <div className="container container-new">
          <div className="footer-inr">
            <div className="foot-top">
              <div className="row">
                <div className="fot-main-content">
                  <div className="fot-logo-cont">
                    <div className="fot-logo-cont-container">
                      <Image
                        src="/images/fot-logo.webp"
                        alt="logo"
                        width={212}
                        height={50}
                      />
                    </div>
                    <p>
                      Shop our beautiful sarees: luxurious silks and vibrant
                      handlooms. Timeless elegance awaits.
                    </p>
                    <div className="copy-social">
                      <a
                        href={footerData?.facebook_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                      <a
                        href={footerData?.twitter_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {/* <i className="fa fa-x-twitter" aria-hidden="true" /> */}
                        <Image src="/images/Tweetx.webp" alt="twitter" width={19} height={19} />
                      </a>
                      <a
                        href={footerData?.instagram_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                      <a
                        href={footerData?.pinterest_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-pinterest-p" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                  <div className="foot-top-lft">
                    <ul className="quick-links">
                      <h5>Quick Links</h5>
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      {!auth_token && (
                        <>
                          <li>
                            <Link href="/login">Login</Link>
                          </li>
                          <li>
                            <Link href="/signup">Sign Up</Link>
                          </li>
                        </>
                      )}
                      <li>
                        <Link href="/search-product">Browse Products</Link>
                      </li>
                      <li>
                        <Link href="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link href="/contact-us">Contact Us</Link>
                      </li>
                      <li>
                        <Link href="/testimonial">Testimonials</Link>
                      </li>
                    </ul>
                    <ul className="quick-links">
                      <h5>Help</h5>
                      <li>
                        <Link href="/faq">FAQ</Link>
                      </li>
                      <li>{/* <Link href="#">Size Guide</Link> */}</li>
                      <li>
                        <Link href="/shipping-policy">Shipping Policy</Link>
                      </li>
                      <li>
                        <Link href="/return-exchange-policy">
                          Return & Exchange Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms-and-conditions">
                          Terms and Conditions
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                      </li>
                    </ul>
                    <ul className="contacts">
                      <li>
                        <h5>Get In Touch</h5>
                        <p>{footerData?.address}</p>
                      </li>
                      <li className="d-flex justify-content-start align-items-start">
                        <span>
                          {phone1 && (
                            <Link href={`tel:${phone1}`}>{phone1}</Link>
                          )}
                          {phone2 && (
                            <Link href={`tel:${phone2}`}>{" / " + phone2}</Link>
                          )}
                        </span>
                      </li>
                      <li className="d-flex justify-content-start align-items-start">
                        <span>
                          <Link href={`mailto:${footerData?.email}`}>
                            {footerData?.email}
                          </Link>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="copy">
        <div className="copy-img">
          <Image
            width={422}
            height={24}
            src="/images/fot-pay.webp"
            alt="logo"
          />
        </div>
        <div className="copy-lft">
          <p>Copyright © {year} ecommerce.com | All Rights Reserved</p>
          <ul>
            <li>
              <Link href="/return-exchange-policy">
                <span>-</span> Refund policy
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy">
                <span>-</span> Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions">
                <span>-</span> Terms of service
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy">
                <span>-</span> Shipping policy
              </Link>
            </li>
            <li>
              <Link href="#">
                <span>-</span> Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
