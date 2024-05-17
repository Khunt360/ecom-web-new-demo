import CategoryProdTags from "@/Components/FilterProduct/CategoryProdTags";
// import ColorSelect from "@/Components/FilterProduct/ColorPlate";
// import FilterAccordion from "@/Components/FilterProduct/FilterAccordion";
import PriceProgressbar from "@/Components/FilterProduct/PriceProgressbar";
import ProductCart from "@/Components/FilterProduct/ProductCart";
import WhyChoose from "@/Components/Home/WhyChoose";
// import { ErrorMessage, Field, Form, Formik } from "formik";
import { FiFilter } from "react-icons/fi";
import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import useCommonApi from "@/hooks/useCommonApi";
import { useDispatch } from "react-redux";
import axios from "@/APiSetUp/axios";
import { toggleLoader } from "@/redux/userSlice";
import NodataFound from "@/Components/NodataFound";
import { useRouter } from "next/router";
import SEOPart from "@/Components/SEOPart";
import { SeoData } from "@/SEOData/SeoData";

// const data = [
//   {
//     image: "/images/saree1.webp",
//     title: "Kanjivaram Saree In Red Shades",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting simply product description will be show here",
//     subPrice: "Rs. 15,100.00",
//     price: "Rs. 12,500.00",
//   },
//   {
//     image: "/images/saree2.webp",
//     title: "Banarasi Saree In White Shades",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting simply product description will be show here",
//     subPrice: "Rs. 22,500.00",
//     price: "Rs. 19,100.00",
//   },
//   {
//     image: "/images/saree3.webp",
//     title: "Red Kanjivaram Saree ",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting simply product description will be show here",
//     subPrice: "Rs. 15,100.00",
//     price: "Rs. 12,500.00",
//   },
//   {
//     image: "/images/saree1.webp",
//     title: "Kanjivaram Saree In Red Shades",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting simply product description will be show here",
//     subPrice: "Rs. 15,100.00",
//     price: "Rs. 12,500.00",
//   },
//   {
//     image: "/images/saree2.webp",
//     title: "Banarasi Saree In White Shades",
//     description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting simply product description will be show here",
//     subPrice: "Rs. 22,500.00",
//     price: "Rs. 19,100.00",
//   },
// ];
// const occasionData = [
//   {
//     title: "Wedding",
//     stock: 400,
//   },
//   {
//     title: "Any Occasions",
//     stock: 1200,
//   },
//   {
//     title: "Casual",
//     stock: 500,
//   },
//   {
//     title: "Ceremonial",
//   },
//   {
//     title: "Party",
//   },
// ];
// const fabricData = [
//   {
//     title: "Art Silk",
//     stock: 1200,
//   },
//   {
//     title: "Soft Net",
//     stock: 1200,
//   },
//   {
//     title: "Raw Silk",
//     stock: 500,
//   },
//   {
//     title: "Georgette",
//   },
// ];
// const printsAndPatternsData = [
//   {
//     title: "Floral",
//   },
//   {
//     title: "Patola",
//   },
//   {
//     title: "Bandhani",
//   },
// ];
// const categoriesList = [
//   {
//     name: "Wedding",
//     value: "1",
//   },
//   {
//     name: "Any Occasions",
//     value: "2",
//   },
// ];
// const categoriesProdTags = [
//   "SAREE ",
//   "ART SILK SAREES ",
//   "PASTEL SAREES ",
//   "HEAVY EMBROIDERY SAREES ",
//   "SAREES UNDER 5000 ",
//   "COCKTAIL ",
//   "RECEPTION ",
//   "BUY 2 GET 1 FREE ",
// ];

const SearctProduct = () => {
  const {
    categoryList,
    subcategoryList,
    addRemoveToWishlist,
    getCategoryList,
    getSubcategoryList,
    // getWishlist
  } = useCommonApi();
  const dispatch = useDispatch();
  const router = useRouter();
  const { categoryId } = router?.query;
  // const { user } = useSelector((state) => state.user);
  // const [selectedColor, setSelectedColor] = useState(null);
  const [isFilterShow, setIsFilterShow] = useState(false);
  // const colors = [
  //   "#C61916",
  //   "#FF7A2F",
  //   "#2664B3",
  //   "#FFFFFF",
  //   "#7C7C8A",
  //   "#000000",
  // ];
  const [isDesktopView, setIsDesktopView] = useState(false);
  const [filterData, setFilterData] = useState(null);
  const [reload, setReload] = useState(false);
  const [rangeValue, setRangeValue] = useState([0, 0]);
  const [minValue, setMinValue] = useState(50);
  const [maxValue, setMaxValue] = useState(500);
  const [data, setData] = useState([]);
  const [allResOfList, setAllResOfList] = useState({});

  // const handleColorSelect = (color) => {
  //   setSelectedColor(color);
  // };
  const handleFilterBtn = () => {
    setIsFilterShow(!isFilterShow);
  };

  const fetchData = useCallback(async () => {
    await Promise.all([getCategoryList()]);
  }, [getCategoryList]);

  const _getProduct = () => {
    const body = {
      params: {
        keywords: "",
        category: filterData?.selectedCategory,
        sub_category: filterData?.selectedSubCategory?.id,
        max_price: rangeValue[1] === 0 ? "" : JSON.stringify(rangeValue[1]),
        min_price: JSON.stringify(rangeValue[0]),
        sort_by: filterData?.sort_by,
        per_page: "100",
        page_no: "1",
      },
    };
    dispatch(toggleLoader());
    axios
      .post("get-search-product-result", body)
      .then((res) => {
        if (res?.data?.details) {
          setMinValue(res?.data?.min_price);
          setMaxValue(res?.data?.max_price);
          setData(res?.data?.details);
          setRangeValue([
            res?.data?.keys?.min_price !== "0"
              ? +res?.data?.keys?.min_price
              : res?.data?.min_price,
            res?.data?.keys?.max_price
              ? +res?.data?.keys?.max_price
              : res?.data?.max_price,
          ]);
          setAllResOfList(res?.data);
        }
      })
      .finally(() => {
        dispatch(toggleLoader());
      });
  };

  useEffect(() => {
    if (filterData?.selectedCategory) {
      getSubcategoryList(filterData?.selectedCategory);
    }
  }, [filterData?.selectedCategory]);

  useEffect(() => {
    _getProduct();
  }, [filterData]);

  useEffect(() => {
    fetchData();
    if (typeof window !== "undefined") {
      setIsDesktopView(window.innerWidth >= 991);
      const handleResize = () => {
        setIsDesktopView(window.innerWidth >= 991);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  useEffect(() => {
    if (categoryId) {
      setFilterData({
        selectedCategory: categoryId,
      });
    }
  }, [categoryId]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      setReload(true);
    };
    window.addEventListener("load", handleBeforeUnload);
    return () => {
      window.removeEventListener("load", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    if (reload) {
      router.replace("/search-product");
      setFilterData(null);
    }
  }, [reload]);

  return (
    <>
      <SEOPart data={SeoData?.search} />
      <div className="search-prod-bg">
        <div className="container container-new">
          <div className="search-prod-main">
            <div className="row">
              {isDesktopView && (
                <Filter
                  _getProduct={_getProduct}
                  categoryList={categoryList}
                  setFilterData={setFilterData}
                  filterData={filterData}
                  setRangeValue={setRangeValue}
                  maxValue={maxValue}
                  rangeValue={rangeValue}
                  minValue={minValue}
                  isDesktopView={isDesktopView}
                  isFilterShow={isFilterShow}
                />
              )}
              <div
                className={`col-xs-12 col-lg-${
                  isFilterShow || isDesktopView ? "9" : "12"
                } col-xl-9 filter-products`}
              >
                <div className="filter-description">
                  <div className="filter-pro-des">
                    <div>
                      <h2>Explore Our Exquisite Saree Collections</h2>
                      <span className="filter-total-items">
                        ({allResOfList?.product_count} items)
                      </span>
                    </div>
                    <p>
                      Sarees for women were once a traditional way of life.
                      Today, it is a fashion statement. No longer seen as
                      something only mothers and grandmothers wear, today, the
                      saree is the ultimate in occasion ethnic wear...
                    </p>
                  </div>

                  <div className="priceDropMain">
                    <div className="">
                      <h4 className="search-filter-title">SORT BY:</h4>
                      <div
                        className="cont-frm-box position-relative"
                        style={{ width: "220px" }}
                      >
                        <form className="categories-selector">
                          <select
                            value={filterData?.sort_by}
                            name="sort_by"
                            onChange={(e) => {
                              setFilterData({
                                ...filterData,
                                ["sort_by"]: e?.target?.value,
                              });
                            }}
                          >
                            <option value="n">New</option>
                            <option value="htl">Price high to low</option>
                            <option value="lth">Price low to high</option>
                            <option value="atz">A - Z</option>
                            <option value="zta">Z - A</option>
                          </select>
                          <span className="input-group-addon">
                            <img src="/images/select.webp" alt="select" />
                          </span>
                        </form>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                      <button
                        className="fastbuy-btn mt-4 search-prod-btn"
                        onClick={() => handleFilterBtn()}
                      >
                        <FiFilter />
                      </button>
                    </div>
                  </div>
                </div>
                {!isDesktopView && (
                  <Filter
                    _getProduct={_getProduct}
                    categoryList={categoryList}
                    setFilterData={setFilterData}
                    filterData={filterData}
                    setRangeValue={setRangeValue}
                    maxValue={maxValue}
                    rangeValue={rangeValue}
                    minValue={minValue}
                    isDesktopView={isDesktopView}
                    isFilterShow={isFilterShow}
                  />
                )}
                <div className="filter-prod-cart-container">
                  {filterData?.selectedCategory &&
                    subcategoryList?.length > 0 && (
                      <CategoryProdTags
                        _selectedTag={(tag) => {
                          setFilterData({
                            ...filterData,
                            selectedSubCategory: subcategoryList?.find(
                              (ele) => ele?.name === tag
                            ),
                          });
                        }}
                        tags={subcategoryList?.map((ele) => ele?.name)}
                        selectedTag={filterData?.selectedSubCategory?.name}
                      />
                    )}
                  <div className="row mt-2 mt-lg-0">
                    {data?.length > 0 ? (
                      data?.map((item, i) => {
                        return (
                          <div className="col-6 col-lg-4" key={i}>
                            <ProductCart
                              item={item}
                              addRemoveToWishlist={addRemoveToWishlist}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div style={{ background: "#fff" }}>
                        <NodataFound msg="No search result found" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhyChoose />
    </>
  );
};

export default SearctProduct;

const Filter = ({
  _getProduct,
  categoryList,
  setFilterData,
  filterData,
  setRangeValue,
  maxValue,
  rangeValue,
  minValue,
  isDesktopView,
  isFilterShow,
}) => {
  return (
    <div
      className={`col-xs-12 col-lg-${
        isFilterShow || isDesktopView ? "3" : "8"
      } col-xl-3 filter-grid-spacing`}
      style={{
        background: !isDesktopView ? "#fff" : "transparent",
        padding: !isDesktopView ? "4px 0 8px 16px" : "0",
        margin: !isDesktopView ? "16px 0 8px 12px" : "0",
      }}
    >
      {isFilterShow || isDesktopView ? (
        <>
          <div className="d-flex justify-content-between filter-clear">
            <h3>Filters</h3>
            {filterData ||
            rangeValue?.[0] !== minValue ||
            rangeValue?.[1] !== maxValue ? (
              <div
                className="d-flex align-items-center gap-1"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setFilterData(null);
                  setRangeValue([minValue, maxValue]);
                }}
              >
                <img src="/images/close.webp" alt="" />
                <p className="text-decoration-underline mb-0 clear-link">
                  Clear all
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="categories">
            <h4 className="search-filter-title">Categories</h4>
            <div className="cont-frm-box position-relative">
              <form className="categories-selector">
                <select
                  value={filterData?.selectedCategory || ""}
                  name="selectedCategory"
                  onChange={(e) => {
                    setFilterData({
                      ...filterData,
                      ["selectedCategory"]: e?.target?.value,
                      selectedSubCategory: {},
                    });
                  }}
                >
                  <option value="">Select your Categories</option>
                  {categoryList?.map((item, index) => {
                    return (
                      <option value={item?.id} key={index}>
                        {item?.name}
                      </option>
                    );
                  })}
                </select>
                <span className="input-group-addon">
                  <img src="/images/select.webp" alt="select" />
                </span>
              </form>
            </div>
          </div>
          {/* <FilterAccordion
                      accordionTitle={"Occasion"}
                      data={occasionData}
                      isMore
                    />
                    <FilterAccordion
                      accordionTitle={"Fabric"}
                      data={fabricData}
                    />
                    <FilterAccordion
                      accordionTitle={"Prints AND Patterns"}
                      data={printsAndPatternsData}
                    />
                    <ColorSelect colors={colors} onSelect={handleColorSelect} /> */}
          <h4 className="search-filter-title mt-2 mt-lg-5">Price</h4>
          <PriceProgressbar
            setRangeValue={setRangeValue}
            rangeValue={rangeValue}
            minValue={minValue}
            maxValue={maxValue}
          />
          <button
            className="fastbuy-btn mt-4 mb-4"
            style={{ width: "100%" }}
            onClick={_getProduct}
          >
            Apply Filters
          </button>
        </>
      ) : null}
    </div>
  );
};
