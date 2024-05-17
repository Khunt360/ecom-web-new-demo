import WhyChoose from "@/Components/Home/WhyChoose";
import Link from "next/link";
import SEOPart from "@/Components/SEOPart";
import { SeoData } from "@/SEOData/SeoData";

const TermsAndCondition = () => {
  return (
    <>
      <SEOPart data={SeoData?.terms} />
      <div className="comm-banner">
        <img src="/images/contact.webp" alt="contact" />
        <div className="container">
          <div className="ban-text">
            <h1>Terms and Conditions</h1>
            <p>Need more help? Reach out to us on live chat or at easybuy@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="faq">
        <div className="container container-new">
          <div className="terms">
            <p>
              Welcome to Fast Buy! These terms and conditions outline the rules
              and regulations for the use of Fast Buy&apos;s Website, located at{" "}
              <Link href="https://ecom-web-next.vercel.app/" target="_blank">
                ecom-web-next.vercel.app
              </Link>
              .
            </p>
            <p>
              By accessing this website, we assume you accept these terms and
              conditions. Do not continue to use Fast Buy if you do not agree to
              take all of the terms and conditions stated on this page.
            </p>
            <h2>Cookies</h2>
            <p>
              We employ the use of cookies. By accessing Fast Buy, you agree to
              use cookies in accordance with Fast Buy&apos;s{" "}
              <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>.
            </p>
            <p>
              Most interactive websites use cookies to let us retrieve the
              user&apos;s details for each visit. Cookies are used by our website to
              enable the functionality of certain areas to make it easier for
              people visiting our website. Some of our affiliate/advertising
              partners may also use cookies.
            </p>
            <h2>License</h2>
            <p>
              Unless otherwise stated, Fast Buy and/or its licensors own the
              intellectual property rights for all material on Fast Buy. All
              intellectual property rights are reserved. You may access this
              from Fast Buy for your own personal use, subject to restrictions
              set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul>
              <li>Republish material from Fast Buy</li>
              <li>Sell, rent or sub-license material from Fast Buy</li>
              <li>Reproduce, duplicate or copy material from Fast Buy</li>
              <li>Redistribute content from Fast Buy</li>
            </ul>
            <h2>Content Liability</h2>
            <p>
              We shall not be held responsible for any content that appears on
              your Website. You agree to protect and defend us against all
              claims that are rising on your Website. No link(s) should appear
              on any Website that may be interpreted as libelous, obscene, or
              criminal, or which infringes, otherwise violates, or advocates the
              infringement or other violation of, any third-party rights.
            </p>
            <h2>Reservation of Rights</h2>
            <p>
              We reserve the right to request that you remove all links or any
              particular link to our Website. You agree to immediately remove
              all links to our Website upon request. We also reserve the right
              to amend these terms and conditions and it&apos;s linking policy at any
              time. By continuously linking to our Website, you agree to be
              bound to and follow these linking terms and conditions.
            </p>
            <h2>Removal of links from our website</h2>
            <p>
              If you find any link on our Website that is offensive for any
              reason, you are free to contact and inform us any moment. We will
              consider requests to remove links but we are not obligated to or
              so or to respond to you directly.
            </p>
            <p>
              We do not ensure that the information on this website is correct,
              we do not warrant its completeness or accuracy; nor do we promise
              to ensure that the website remains available or that the material
              on the website is kept up to date.
            </p>
            <h2>Disclaimer</h2>
            <p>
              To the maximum extent permitted by applicable law, we exclude all
              representations, warranties, and conditions relating to our
              website and the use of this website. Nothing in this disclaimer
              will:
            </p>
            <ul>
              <li>
                limit or exclude our or your liability for death or personal
                injury;
              </li>
              <li>
                limit or exclude our or your liability for fraud or fraudulent
                misrepresentation;
              </li>
              <li>
                limit any of our or your liabilities in any way that is not
                permitted under applicable law; or
              </li>
              <li>
                exclude any of our or your liabilities that may not be excluded
                under applicable law.
              </li>
            </ul>
            <p>
              The limitations and prohibitions of liability set in this Section
              and elsewhere in this disclaimer: (a) are subject to the preceding
              paragraph; and (b) govern all liabilities arising under the
              disclaimer, including liabilities arising in contract, in tort,
              and for breach of statutory duty.
            </p>
            <p>
              As long as the website and the information and services on the
              website are provided free of charge, we will not be liable for any
              loss or damage of any nature.
            </p>
            <h2>Governing Law & Jurisdiction</h2>
            <p>
              These terms will be governed by and interpreted in accordance with
              the laws of the State of West Bengal, and you submit to the
              non-exclusive jurisdiction of the state and federal courts located
              in West Bengal for the resolution of any disputes.
            </p>
          </div>
        </div>
      </div>
      <WhyChoose />
    </>
  );
};

export default TermsAndCondition;
