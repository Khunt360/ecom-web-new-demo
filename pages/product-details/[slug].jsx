// import ColorSelect from "@/Components/FilterProduct/ColorPlate";
import ProductSlider from "@/Components/ProductDetails/ProductSlider";
import FormTitleSubTitle from "@/Components/Common/FormTitleSubTitle";
import UpcomingProductCard from "@/Components/Common/UpcomingProductCard";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "@/APiSetUp/axios";
// import { toggleLoader } from "@/redux/userSlice";
import useCommonApi from "@/hooks/useCommonApi";
// import { toggleLoader } from "@/redux/userSlice";
import { useSelector } from "react-redux";
import { toggleLoader } from "@/redux/userSlice";
import Link from "next/link";
import { Site_URL, BASE_URL } from "@/APiSetUp/axios";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
const colors = [
  "#BF916E",
  "#FF7A2F",
  "#2664B3",
  "#FFFFFF",
  "#7C7C8A",
  "#000000",
];
// const categoriesProdTags = [
//   "SAREE ",
//   "ART SILK SAREES ",
//   "PASTEL SAREES ",
//   "HEAVY EMBROIDERY SAREES ",
//   "SAREES UNDER 5000 ",
//   "SAREE ",
//   "ART SILK SAREES ",
//   "PASTEL SAREES ",
//   "HEAVY EMBROIDERY SAREES ",
//   "SAREES UNDER 5000 ",
//   "COCKTAIL ",
//   "RECEPTION ",
//   "BUY 2 GET 1 FREE ",
// ];

// const data = [
//   {
//     image: "/images/product1.webp",
//     name: "Kanjivaram Saree In Red Shades",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting simply product description will be show here",
//     subPrice: "Rs. 15,100.00",
//     price: "Rs. 12,500.00",
//   },
//   {
//     image: "/images/product2.webp",
//     name: "Banarasi Saree In White Shades",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting simply product description will be show here",
//     subPrice: "Rs. 22,500.00",
//     price: "Rs. 19,100.00",
//   },
//   {
//     image: "/images/product3.webp",
//     name: "Red Kanjivaram Saree ",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting simply product description will be show here",
//     subPrice: "Rs. 15,100.00",
//     price: "Rs. 12,500.00",
//   },
// ];
const ProductDetails = ({ productData }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const { categoryList, getCategoryList, addToCart, addRemoveToWishlist } =
    useCommonApi();
  const { count } = useSelector((state) => state.cart);

  // const [selectedColor, setSelectedColor] = useState(null);
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [inStock, setInStock] = useState("");
  const [similar, setSimilar] = useState([]);
  const [offer, setOffer] = useState([]);
  const [pinCode, setPinCode] = useState("");
  const [error, setError] = useState("");

  // const handleColorSelect = (color) => {
  //   setSelectedColor(color);
  // };
  const owl_product = {
    loop: true,
    margin: 32,
    nav: true,
    dots: false,
    smartSpeed: 4000,
    responsive: {
      0: {
        items: 2,
      },
      480: {
        items: 3,
        margin: 16,
      },
      1000: {
        items: 4,
      },
    },
  };

  // const getDetail = useCallback((slug)=>{
  //   let data = {
  //     params: {
  //       product_slug: slug,
  //     },
  //   };
  //   dispatch(toggleLoader());
  //   axios.post("/get-product-details", data).then((res) => {
  //     dispatch(toggleLoader());
  //     // setImages(res?.data?.result?.details?.get_all_image);
  //     // setProduct(res?.data?.result?.details);
  //     // setMainImage(
  //     //   res?.data?.result?.products?.get_default_image?.product_image
  //     // );
  //     // setSimilar(res?.data?.result?.related_products);
  //     // if (
  //     //   !res?.data?.result?.products &&
  //     //   res?.data?.error?.meaning === "This product is not available now"
  //     // ) {
  //     //   navigate("/search-product");
  //     // }
  //   });
  // },[dispatch])

  const checkPinCode = () => {
    let data = {
      params: {
        pincode: pinCode,
      },
    };
    dispatch(toggleLoader());
    axios.post("/available-pincode", data).then((res) => {
      dispatch(toggleLoader());
      setError(res?.data?.status === "N");
      if (res?.data?.status === "Y") {
        setError({
          msg: "COD is available on this pincode.",
          key: true,
        });
      } else if (res?.data?.status === "N") {
        setError({ msg: "COD is not available on this pincode", key: false });
      }
    });
  };

  useEffect(() => {
    if (productData) {
      setImages(productData?.details?.get_all_image);
      setImages(productData?.details?.get_all_image);
      setInStock(productData?.in_stock);
      setProduct(productData?.details);
      setSimilar(productData?.related_products);
      setOffer(productData?.global_offer);
    }
    getCategoryList();
    // getDetail(router?.query?.slug)
  }, [router?.query?.slug, getCategoryList, productData, user]);

  const wishlisted = count?.wish_product_id?.includes(product?.id?.toString());

  useEffect(() => {
    if (!pinCode) {
      setError({ msg: "" });
    }
  }, [pinCode]);

  return (
    <>
      <Head>
        <title>{product?.title}</title>
        <meta name="description" content={product?.description}></meta>
        <meta property="og:title" content={`${product?.title}`} />
        <meta property="og:description" content={`${product?.description}`} />
        <meta
          property="og:image"
          content={`${BASE_URL + images?.[0]?.image}`}
        />
        <meta name="twitter:card" content={`${product?.title}`} />
        <meta name="twitter:title" content={`${product?.title}`} />
        <meta name="twitter:description" content={`${product?.description}`} />
        <meta
          name="twitter:image"
          content={`${BASE_URL + images?.[0]?.image}`}
        />
        <link
          rel="canonical"
          href={`${Site_URL}product-details/${product?.slug}`}
        />
      </Head>
      <div className="path-container">
        <div className="container container-new">
          <p> Home / Trending collection</p>
        </div>
      </div>
      <div className="container container-new">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <ProductSlider images={images} product={product} />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="prod-details-description">
              <div className="prod-status">
                <p>
                  {product?.product_p_category?.get_category?.name} /{" "}
                  {product?.product_sub_category?.get_category?.name}
                </p>
                <span
                  style={{
                    backgroundColor: inStock === "Y" ? "#43a75f" : "#e9332b",
                  }}
                >
                  {inStock === "Y" ? "In Stock" : "Out of stock"}
                </span>
              </div>
              <h3 className="prod-title">{product?.title}</h3>
              <div className="price-contain-pro-details">
                <p>
                  {product?.get_product_ind_price?.after_discount_price !== product?.get_product_ind_price?.price ? `${product?.get_product_ind_price?.get_currency?.symbol} ${product?.get_product_ind_price?.price}` : ``}

                </p>
                <p>
                  {product?.get_product_ind_price?.get_currency?.symbol}{" "}
                  {product?.get_product_ind_price?.after_discount_price}
                </p>
              </div>
              <p className="inclusive-taxes">Inclusive of all taxes</p>
              {offer && (
                <>
                  <div className="available-offers">
                    <img src="/images/svg/Discount.svg" alt="Discount" />
                    <h5> Available Offers</h5>
                  </div>
                  <div className="offers-description-boxs">
                    <div className="row">
                      <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6">
                        <div className="offer-title-des">
                          <h6>
                            Additional flat {offer?.offer_percentage}% off
                          </h6>
                          <p>Products are pre discounted for you!</p>
                        </div>
                      </div>
                      {/* <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6">
                    <div className="offer-title-des">
                      <h6>Additional flat 20% off</h6>
                      <p>Products are pre discounted for you!</p>
                    </div>
                  </div> */}
                      {/* <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6">
                    <div className="offer-title-des">
                      <h6>Buy 2 Get 1 Free</h6>
                      <p>Add 3 Products to your cart & get 1 free!</p>
                    </div>
                  </div> */}
                    </div>
                  </div>
                </>
              )}
              {inStock === "Y" && (
                <div className="offers-description-boxs">
                  {/* <ColorSelect colors={colors} onSelect={handleColorSelect} /> */}
                  <div className="row add-to-btn-box">
                    <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6">
                      <button
                        className="add-to-btn add-to-cart-btn"
                        onClick={() => addToCart(product?.id)}
                      >
                        <img src="/images/svg/shopping-bag.svg" alt="" />
                        Add To Cart
                      </button>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-12 col-lg-6">
                      <button
                        className={`add-to-btn add-to-wishlist ${
                          wishlisted && `wishlisted`
                        }`}
                        onClick={
                          user
                            ? () => addRemoveToWishlist(product?.id)
                            : () => router.push("/login")
                        }
                      >
                        <img
                          src={
                            wishlisted
                              ? "/images/heart-fill.webp"
                              : "/images/heart.webp"
                          }
                          alt=""
                        />
                        {wishlisted ? "Added" : "Add"} To Wishlist
                      </button>
                    </div>
                  </div>
                  <div className="pin-code-part">
                    <div className="row">
                      <p>Please enter PIN Code to check delivery time</p>
                      <div className="col-xs-12 col-xl-7">
                        <label>pin code</label>
                        <div className="pin-code-control-box">
                          <input
                            type="number"
                            className="form-control"
                            value={pinCode}
                            onChange={(e) => setPinCode(e?.target?.value)}
                          />
                          <button
                            className="contained-black-btn"
                            onClick={() => {
                              checkPinCode();
                            }}
                          >
                            check
                          </button>
                        </div>
                        <label
                          style={{
                            color: `${error?.key ? "#43a75f" : "#e9332b"}`,
                          }}
                        >
                          {error?.msg}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="offers-description-boxs">
                <div className="prod-extra-details">
                  <h6>Product Details</h6>
                  <p>{product?.description}</p>
                  <ul>
                    <li>Gold Saree in Georgette fabric</li>
                    <li>The Saree is elevated with Sequins embroidery</li>
                    <li>It comes with an Unstitched blouse</li>
                    <li>Comes with the Koskii promise of premium quality</li>
                  </ul>
                  <h6>Size And Fit</h6>
                  <p>Weight: {productData?.details?.gross_weight} gm; Length: {productData?.details?.length} cm; Width : {productData?.details?.breadth} cm</p>
                  {/* <h6>Material And Care</h6>
                  <p>Georgette</p>
                  <p>Dry Wash Only</p> */}
                  {/* <h6>Product Code</h6>
                  <p>SAUS0032539_BEIGE</p> */}
                  <p>
                    <b> Note </b> : Product color may slightly vary due to
                    photographic lighting sources or your monitor settings.
                  </p> 
                </div>
              </div>
              <div className="prod-services-spacing">
                <div className="bgServices">
                  <div className="services-perticular-box">
                    <img src="/images/svg/FreeShipping.svg" alt="" />
                    <h4>
                      FREE <br /> SHIPPING
                    </h4>
                  </div>
                  <div className="services-perticular-box">
                    <img src="/images/svg/asuuredQualityPro.svg" alt="" />
                    <h4>
                      ASSURED <br /> QUALITY PRODUCT
                    </h4>
                  </div>
                  <div className="services-perticular-box">
                    <img src="/images/svg/protection.svg" alt="" />
                    <h4>
                      100% PURCHASE <br /> PROTECTION
                    </h4>
                  </div>
                  <div className="services-perticular-box">
                    <img src="/images/svg/pricePromise.svg" alt="" />
                    <h4>
                      BEST PRICE <br /> PROMISE
                    </h4>
                  </div>
                  <div className="services-perticular-box">
                    <img src="/images/svg/securityPayment.svg" alt="" />
                    <h4>
                      SECURE <br /> PAYMENT
                    </h4>
                  </div>
                </div>
                {/* <img src='/images/services-bg.webp' height={'auto'} width={'100%'} /> */}
              </div>
              {/* <div className="service-accordion">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Product Specifications
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <ul>
                          <li>Product Category : Saree</li>
                          <li>Fabric : Georgette</li>
                          <li>Work : Sequins</li>
                          <li>Color : Gold </li>
                          <li>Pack Contains: 1N </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Shipping information
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">Shipping information </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        More information
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">More information </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        Need Help
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">Need Help</div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        FAQs
                      </button>
                    </h2>
                    <div
                      id="collapseFive"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFive"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">FAQs</div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSix">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSix"
                        aria-expanded="false"
                        aria-controls="collapseSix"
                      >
                        Returns Policy
                      </button>
                    </h2>
                    <div
                      id="collapseSix"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingSix"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">Returns Policy</div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="prod-details-carousel">
        <div className="container container-new">
          <FormTitleSubTitle
            title={"Similar Products"}
            subTitle={
              "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt "
            }
          />
          {similar?.length > 0 && (
            <OwlCarousel
              className="owl-carousel owl-theme owl-product"
              {...owl_product}
            >
              {similar?.map((item, i) => {
                return (
                  <div className="item" key={i}>
                    <UpcomingProductCard item={item} slNo={i + 1} />
                  </div>
                );
              })}
            </OwlCarousel>
          )}
        </div>
      </div>
      <div className="pro-det-browse-popular-categories">
        <div className="container container-new">
          <h2>Browse By Popular Categories</h2>
          <div className="tag-list">
            {categoryList.map((tag, index) => (
              <Link
                href={`/search-product?categoryId=${tag?.id}`}
                key={index}
                className="tag"
              >
                {tag?.name}
                <img src="/images/svg/chevron.svg" alt="select" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  try {
    const { slug } = context.query; // Access the route parameter

    const data = {
      params: {
        product_slug: slug,
      },
    };

    const response = await axios.post("get-product-details", data);

    if (response && response.data) {
      const productData = response.data;
      // Return the data as props
      return {
        props: {
          productData,
        },
      };
    } else {
      // Handle the case where the response or product data is not available
      return {
        notFound: true, // Return a 404 page
      };
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    return {
      props: {
        productData: null, // Return null if there's an error
      },
    };
  }
}
