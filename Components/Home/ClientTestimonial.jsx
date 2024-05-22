import dynamic from "next/dynamic";
import Link from "next/link";
import { BASE_URL } from "@/APiSetUp/axios";
import ImageComponent from "../NextComponent/ImageComponent";
import Image from "next/image";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const ClientTestimonial = ({ image, testimonial }) => {
  const owl_testimonial = {
    loop: true,
    nav: true,
    dots: false,
    smartSpeed: 1000,
    margin: 32,
    items: 1,
  };
  return (
    <section className="clientTestimonial">
      <div className="row">
        <div className="col-lg-6 testimonialLeftPart">
          <ImageComponent
            src={BASE_URL + image}
            alt="testimonial"
            width={760}
            height={572}
            />
        </div>
        <div className="col-lg-6 testimonialRightPart">
          <div className="box"></div>
          <div className="contentItem">
            {testimonial?.length > 0 && (
              <OwlCarousel
                className="owl-carousel owl-theme owl-testimonial"
                {...owl_testimonial}
              >
                {testimonial?.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      <Image src="/images/logo.webp" alt="logo" width={140} height={33}/>
                      <h1>Client Testimonials</h1>
                      <p>“{item?.description}”</p>
                      <h6>
                        -{item?.user_name} ({item?.location})
                      </h6>
                      <Link href="/testimonial">Read all reviews</Link>
                    </div>
                  );
                })}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonial;
