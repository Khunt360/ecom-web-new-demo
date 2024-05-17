import WhyChoose from "@/Components/Home/WhyChoose";
import Link from "next/link";
import SEOPart from "@/Components/SEOPart";
import { SeoData } from "@/SEOData/SeoData";

const PrivacyPolicy = () => {
  return (
    <>
      <SEOPart data={SeoData?.privacy} />
      <div className="comm-banner">
        <img src="/images/contact.webp" alt="contact" />
        <div className="container">
          <div className="ban-text">
            <h1>Privacy Policy</h1>
            <p>Need more help? Reach out to us on live chat or at easybuy@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="faq">
        <div className="container container-new">
          <div className="terms">
            <p>
              Your privacy is important to us. It is Fast Buy&apos;s policy to
              respect your privacy regarding any information we may collect from
              you across our website,{" "}
              <a href="https://ecom-web-next.vercel.app/">
                ecom-web-next.vercel.app
              </a>
              , and other sites we own and operate.
            </p>
            <h2>Information We Collect</h2>
            <p>
              We only ask for personal information when we truly need it to
              provide a service to you. We collect it by fair and lawful means,
              with your knowledge and consent. We also let you know why we’re
              collecting it and how it will be used.
            </p>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                Personal Information: Name, email address, phone number, postal
                address, and similar information.
              </li>
              <li>
                Log Data: Information your browser sends whenever you visit our
                website. This may include your computer’s Internet Protocol (IP)
                address, browser type, browser version, the pages of our website
                that you visit, the time and date of your visit, the time spent
                on those pages, and other statistics.
              </li>
              <li>
                Cookies: Cookies are files with a small amount of data that is
                commonly used as an anonymous unique identifier. These are sent
                to your browser from the website that you visit and are stored
                on your computer’s hard drive.
              </li>
            </ul>
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul>
              <li>Provide, operate, and maintain our website.</li>
              <li>Improve, personalize, and expand our website.</li>
              <li>Understand and analyze how you use our website.</li>
              <li>
                Develop new products, services, features, and functionality.
              </li>
              <li>
                Communicate with you, either directly or through one of our
                partners, including for customer service, to provide you with
                updates and other information relating to the website, and for
                marketing and promotional purposes.
              </li>
              <li>Send you emails.</li>
            </ul>
            <h2>Sharing Your Information</h2>
            <p>
              We may share the information we collect with third parties who
              need access to it to perform their functions.
            </p>
            <h2>Security</h2>
            <p>
              We value your trust in providing us your personal information,
              thus we are striving to use commercially acceptable means of
              protecting it. But remember that no method of transmission over
              the internet, or method of electronic storage is 100% secure and
              reliable, and we cannot guarantee its absolute security.
            </p>
            <h2>Links to Other Sites</h2>
            <p>
              Our website may contain links to other sites. If you click on a
              third-party link, you will be directed to that site. Note that
              these external sites are not operated by us. Therefore, we
              strongly advise you to review the Privacy Policy of these
              websites. We have no control over, and assume no responsibility
              for the content, privacy policies, or practices of any third-party
              sites or services.
            </p>
            <h2>Children’s Privacy</h2>
            <p>
              Our website does not address anyone under the age of 13. We do not
              knowingly collect personal identifiable information from children
              under 13. In the case we discover that a child under 13 has
              provided us with personal information, we immediately delete this
              from our servers. If you are a parent or guardian and you are
              aware that your child has provided us with personal information,
              please contact us so that we will be able to do the necessary
              actions.
            </p>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Thus, we
              advise you to review this page periodically for any changes. We
              will notify you of any changes by posting the new Privacy Policy
              on this page. These changes are effective immediately after they
              are posted on this page.
            </p>
            <h2>Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy,
              do not hesitate to contact us at{" "}
              <Link href="mailto:info@ecommerce123.com">
                info@ecommerce123.com
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <WhyChoose />
    </>
  );
};

export default PrivacyPolicy;
