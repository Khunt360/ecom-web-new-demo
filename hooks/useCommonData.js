import axios from "@/APiSetUp/axios";

// Server-side functions
export const fetchCountryList = async () => {
  try {
    const response = await axios.post("country-list");
    return {
      countryList: response?.data?.result?.country_list || [],
      stateList: response?.data?.result?.state_list || [],
    };
  } catch (error) {
    console.error("Error fetching country list:", error);
    return { countryList: [], stateList: [] };
  }
};

export const fetchCategoryList = async () => {
  try {
    const response = await axios.post("/category-list");
    return {
      categoryList: response?.data?.result?.category_list || [],
    };
  } catch (error) {
    console.error("Error fetching category list:", error);
    return { categoryList: [] };
  }
};

export const fetchFooter = async () => {
  try {
    const response = await axios.post("footer-text");
    return response?.data?.result?.data || null;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
};
