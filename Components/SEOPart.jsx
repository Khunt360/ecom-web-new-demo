import Head from "next/head";
import { BASE_URL } from "@/APiSetUp/axios";

function SEOPart({ data, seo, canonical,imgUrl,image }) {
  return (
    <Head>
      <title>{seo?.seo_title ? seo?.seo_title : data?.title}</title>
      <meta
        name="description"
        content={`${
          seo?.seo_description ? seo?.seo_description : data?.description
        }`}
      />
      <meta
        property="og:title"
        content={`${seo?.seo_title ? seo?.seo_title : data?.title}`}
      />
      <meta
        property="og:description"
        content={`${
          seo?.seo_description ? seo?.seo_description : data?.description
        }`}
      />
      <meta property="og:image" content={imgUrl&& image?BASE_URL+imgUrl+image: data?.image} />
      <meta
        name="twitter:card"
        content={`${seo?.seo_title ? seo?.seo_title : data?.title}`}
      />
      <meta
        name="twitter:title"
        content={`${seo?.seo_title ? seo?.seo_title : data?.title}`}
      />
      <meta
        name="twitter:description"
        content={`${
          seo?.seo_description ? seo?.seo_description : data?.description
        }`}
      />
      <meta name="twitter:image" content={imgUrl&& image?BASE_URL+imgUrl+image: data?.image} />
      <link rel="canonical" href={`${canonical?canonical:data?.canonical}`} />
    </Head>
  );
}

export default SEOPart;
