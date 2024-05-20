import Image from "next/image";
import Link from "next/link";

const TradingCollections = ({ heading, subheading }) => {
  return (
    <section className="tradingCollections">
      <div className="container container-new">
        <div className="banner-text-bg">
         {heading && <h2>
            {heading?.split(" ")[0]} <span>{heading?.split(" ")[1]}</span>
          </h2>}
          <p>{subheading}</p>
          <Link href="/search-product">
            Shop Now <Image
        loading='lazy'
        unoptimized  src="/images/right-arrow-white.webp" alt="" width={15} height={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TradingCollections;
