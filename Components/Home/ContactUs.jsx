import { useRouter } from "next/router";

const ContactUs = ({heading,subheading}) => {
  const router = useRouter()
  return (
    <section className="contactUs">
      <h2>{heading}</h2>
      <span>
        {subheading}
      </span>
      <button onClick={() => {
        router.push("/contact-us")
      }}>Contact us</button>
    </section>
  );
};

export default ContactUs;
