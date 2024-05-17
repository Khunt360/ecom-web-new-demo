import { Site_URL, BASE_URL } from "@/APiSetUp/axios";
const imgUrl = `${BASE_URL}e-commerce/storage/app/public/banner_image/1713509866.png`;

export const SeoData = {
  home: {
    title: "Fast Buy",
    description: "Fast Buy",
    image: imgUrl,
    canonical: Site_URL,
  },
  about: {
    title: "About Us | Fast Buy",
    description: "About Us | Fast Buy",
    image: imgUrl,
    canonical: `${Site_URL}about-us`,
  },
  contact: {
    title: "Contact Us | Fast Buy",
    description: "Contact Us | Fast Buy",
    image: imgUrl,
    canonical: `${Site_URL}contact-us`,
  },
  login: {
    title: "Login | Fast Buy",
    description: "Login | Fast Buy",
    image: imgUrl,
    canonical: `${Site_URL}login`,
  },
  signUp: {
    title: "Register | Fast Buy",
    description: "Register | Fast Buy",
    image: imgUrl,
    canonical: `${Site_URL}sign-up`,
  },
  privacy: {
    title: "Privacy Policy | Fast Buy",
    description: "Privacy Policy | Fast Buy",
    image: imgUrl,
    canonical: `${Site_URL}privacy-policy`,
  },
  terms: {
    title: "Terms and conditions | Fast Buy",
    description: "Terms and conditions | Fast Buy",
    image: imgUrl,
    canonical: `${Site_URL}terms-and-conditions`,
  },
  return: {
    title: "Return & Exchange Policy | Fast Buy",
    description: "Return & Exchange Policy | Fast Buy",
    image: imgUrl,
    canonical: `${Site_URL}return-exchange-policy`,
  },
  shippingPolicy: {
    title: "Shipping Policy | Fast Buy",
    description: "Shipping Policy | Fast Buy",
    image: imgUrl,
    canonical: `${Site_URL}shipping-policy`,
  },

  testi: {
    title: "Testimonials | Fast Buy",
    description: "Testimonials | Fast Buy",
    image: imgUrl,
    canonical: `${Site_URL}testimonials`,
  },
  faq: {
    title: "FAQ | Fast Buy",
    description: "FAQ | Fast Buy",
    image: imgUrl,
    canonical: `${Site_URL}faq`,
  },
  search: {
    title: "Explore Exquisite Sarees - Discover Traditional & Modern Styles",
    description:
      "Find your perfect saree in our curated collection of traditional and modern styles. Explore luxurious silk, vibrant cotton, and elegant handloom sarees for every occasion.",
    image: imgUrl,
    canonical: `${Site_URL}search-product`,
  },
};
