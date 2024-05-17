import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const testimonial = [
  {
    heading: "Caption text or heading",
    description:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the when caption text ever since the when an unknown.",
    author: "Mark Anderson",
    city: "Califonia",
  },
  {
    heading: "Caption text or heading",
    description:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the when caption text ever since the when an unknown.",
    author: "Mark Anderson",
    city: "Califonia",
  },
  {
    heading: "Caption text or heading",
    description:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the when caption text ever since the when an unknown.",
    author: "Mark Anderson",
    city: "Califonia",
  },
  {
    heading: "Caption text or heading",
    description:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the when caption text ever since the when an unknown.",
    author: "Mark Anderson",
    city: "Califonia",
  },
  {
    heading: "Caption text or heading",
    description:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the when caption text ever since the when an unknown.",
    author: "Mark Anderson",
    city: "Califonia",
  },
  {
    heading: "Caption text or heading",
    description:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since the when caption text ever since the when an unknown.",
    author: "Mark Anderson",
    city: "Califonia",
  },
];

const Testimonial = () => {
  const owl_testimonial = {
    loop: true,
    margin: 32,
    nav: false,
    dots: true,
    autoplay: true,
    smartSpeed: 4000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  };
  return (
    <div>
      {" "}
      <section className="testimonial position-relative">
        <em className="testi-bg1 position-absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={316}
            height={95}
            viewBox="0 0 316 95"
            fill="none"
          >
            <path
              d="M15 91.9991C39.6857 55.2367 28.916 24.682 20.4454 14L82.1597 21.8604L87 57.5344C31.8202 99.1339 16.0084 97.844 15 91.9991Z"
              fill="#FFE800"
            />
            <path
              d="M0 0C47.9517 51.3144 178.284 123.155 316 0H0Z"
              fill="#FFE800"
            />
          </svg>
        </em>
        <em className="testi-bg2 position-absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={119}
            height={773}
            viewBox="0 0 119 773"
            fill="none"
          >
            <path d="M119 0H118V773H119V0Z" fill="#BCF5F5" />
            <path d="M1 0H0V773H1V0Z" fill="#BCF5F5" />
          </svg>
        </em>
        <div className="container container-new">
          <div className="testi-hdr">
            <h2>What’s our Clients say</h2>
            <p>
              {`Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever`}
            </p>
          </div>
          <div className="testi-inr">
            <OwlCarousel
              className="owl-carousel owl-theme owl-testimonial"
              {...owl_testimonial}
            >
              {testimonial?.map((item, i) => {
                return (
                  <div className="item" key={i}>
                    <div className="testi-box position-relative">
                      <div className="tester position-relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={50}
                          height={233}
                          viewBox="0 0 50 233"
                          fill="none"
                        >
                          <path
                            d="M28 11C28 4.92486 32.9249 0 39 0C45.0751 0 50 4.92487 50 11V222C50 228.075 45.0751 233 39 233C32.9249 233 28 228.075 28 222V11Z"
                            fill="#001280"
                          />
                          <path
                            d="M0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5V39.5C21 45.299 16.299 50 10.5 50C4.70101 50 0 45.299 0 39.5V10.5Z"
                            fill="#FFE800"
                          />
                        </svg>
                      </div>
                      <div className="tester-txt position-relative">
                        <h3>{item.heading}</h3>
                        <p>{item.description}</p>
                        <h5>{item.author}</h5>
                        <h6>{item.city}</h6>
                      </div>
                    </div>
                  </div>
                );
              })}
            </OwlCarousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
