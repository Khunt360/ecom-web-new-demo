import { BASE_URL } from "@/APiSetUp/axios";

const FounderInfo = ({ heading, subheading, sign, name }) => {
  return (
    <div>
      <section className="founderInfo">
        <div className="line-img">
          <img src="/images/night-wear-line.webp" alt="background" />
        </div>
        <div className="container  founderInfo-content">
          <div className="row">
            <div className="col-lg-6">
              <h3>{heading}</h3>
            </div>
            <div className="col-lg-6 secondSec">
              <span>{subheading}</span>
              <div className="sign">
                <img src={BASE_URL + sign} alt="founder signature" />
                <span>
                  {name}
                  <br />
                  (Founder)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FounderInfo;
