import { BASE_URL } from "@/APiSetUp/axios";
import Image from "next/image";

const FounderInfo = ({ heading, subheading, sign, name }) => {
  return (
    <div>
      <section className="founderInfo">
        <div className="line-img">
          <Image
        loading='lazy'
        unoptimized layout="responsive" src="/images/night-wear-line.webp" alt="background" width={15} height={15}/>
        </div>
        <div className="container  founderInfo-content">
          <div className="row">
            <div className="col-lg-6">
              <h3>{heading}</h3>
            </div>
            <div className="col-lg-6 secondSec">
              <span>{subheading}</span>
              <div className="sign">
                {sign && <Image
        loading='lazy'
        unoptimized  src={BASE_URL + sign} alt="founder signature" width={200} height={100} />}
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
