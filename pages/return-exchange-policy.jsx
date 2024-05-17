import WhyChoose from "@/Components/Home/WhyChoose";
import NodataFound from "@/Components/NodataFound";
import SEOPart from "@/Components/SEOPart";
import { SeoData } from "@/SEOData/SeoData";
import React, { useState } from "react";

const Policy = () => {
    const [faqData, setFaqData] = useState([
        {
            title: "Return/Refund or exchange eligibility",
            description:
                `<ul>
                <li><strong>Return Policy:</strong> This outlines the conditions under which a customer can return an item for a refund. For sarees, common reasons for returns might include wrong size, color discrepancy, or defects in the fabric. The return period is usually specified, such as 7, 14, or 30 days from the date of purchase.</li><br />
                <li><strong>Refund Policy:</strong> This specifies how refunds are processed. Refunds may be issued in the original form of payment or as store credit. Some stores might deduct a restocking fee for returns, especially for items that are not in their original condition.</li><br />
                <li><strong>Exchange Policy:</strong> If customers want to exchange a saree for a different size, color, or design, the exchange policy comes into play. It typically outlines whether exchanges are allowed, the time frame within which exchanges must be requested, and any conditions for exchanging items.</li><br />
                <li><strong>Conditions for Eligibility:</strong> Customers may need to meet certain conditions to be eligible for returns, refunds, or exchanges. For instance, the saree must be unworn, unwashed, and in its original packaging with all tags attached. Some stores may not accept returns on sale or clearance items.</li><br />
                <li><strong>Process for Returns/Exchanges:</strong> The process for initiating returns or exchanges should be clearly explained on the e-commerce website. This may involve filling out a return/exchange form, contacting customer support, or initiating the process through the user account on the website.</li><br />
                <li><strong>Return Shipping:</strong> Clarify whether the customer is responsible for return shipping costs or if the store provides prepaid return labels.</li><br />
                <li><strong>Exceptions:</strong> Some items may be non-returnable or non-refundable due to hygiene reasons or other restrictions. Ensure that these exceptions are clearly communicated to customers.</li>
            </ul>
            `
        },
        {
            title: "Refund/Exchange process",
            description:
                `<ul>
            <li><strong>Clear Return/Exchange Policy:</strong> Ensure that your ecommerce site has a clear and easily accessible Return/Exchange policy. It should outline the conditions under which returns or exchanges are accepted, such as time limits, condition of the saree, and any applicable fees.</li><br />
<li><strong>Customer Initiation:</strong> When a customer wants to return or exchange a saree, provide them with a straightforward way to initiate the process. This could be through a dedicated section on your website where they can fill out a form or contact customer support directly.</li><br />
<li><strong>Verification of Eligibility:</strong> Once the request is initiated, verify that the saree meets the conditions outlined in your Return/Exchange policy. This includes checking if the saree is unused, unwashed, and in its original packaging with all tags intact.</li><br />
<li><strong>Authorization:</strong> If the saree meets the eligibility criteria, provide the customer with authorization to proceed with the return or exchange. This could be in the form of a return merchandise authorization (RMA) number or a confirmation email.</li><br />
<li><strong>Shipping Instructions:</strong> Provide the customer with clear instructions on how to return or exchange the saree. This includes information on where to ship the item, any shipping labels or documents required, and any associated shipping costs.</li><br />
<li><strong>Inspection and Processing:</strong> Upon receiving the returned saree, inspect it to ensure that it meets the conditions for a return or exchange. Once approved, process the refund or initiate the exchange promptly.</li><br />
<li><strong>Communication:</strong> Keep the customer informed throughout the process. Send them updates on the status of their return or exchange, including confirmation of receipt, inspection, and when the refund or exchange has been processed.</li><br />
<li><strong>Resolution:</strong> Resolve any issues that may arise during the return or exchange process promptly and professionally. This includes addressing any concerns the customer may have and providing satisfactory solutions.</li><br />
<li><strong>Feedback:</strong> After the return or exchange is complete, solicit feedback from the customer about their experience. Use this feedback to improve your Return/Exchange process and overall customer satisfaction.</li><br />
<li><strong>Continuous Improvement:</strong> Regularly review and update your Return/Exchange process based on customer feedback and industry best practices to ensure it remains efficient and customer-friendly.</li>
      </ul>`
        },
        {
            title: "Refund timeline",
            description:
                `<ul>
                <li><strong>Initiation:</strong> The customer requests a refund through the ecommerce site's refund process. This can typically be done within a certain timeframe from the date of receiving the saree, often within 7 to 30 days depending on the site's policy.</li><br />
                <li><strong>Processing Time:</strong> Once the refund request is received, the ecommerce site will review the request. This process usually takes a few days, during which they may inspect the saree to ensure it's in its original condition.</li><br />
                <li><strong>Approval:</strong> If the refund request meets the site's criteria (such as being within the allowed return window and the saree being in its original condition), the refund is approved.</li><br />
                <li><strong>Refund Issuance:</strong> After approval, the refund is processed. The time it takes for the refund to appear in the customer's account can vary based on the payment method used. Credit card refunds may take a few days to reflect in the customer's account, while refunds to digital wallets or payment platforms might be faster.</li><br />
                <li><strong>Completion:</strong> Once the refund is issued, the transaction is considered complete. The customer should receive a notification confirming the refund has been processed.</li>
            </ul>
            `
        }
    ]);

    return (
        <>
            <SEOPart data={SeoData?.return} />
            <div className="comm-banner">
                <img src="/images/contact.webp" alt="contact" />
                <div className="container">
                    <div className="ban-text">
                        <h1>Return & Exchange Policy</h1>
                        <p>Need more help? Reach out to us on live chat or at easybuy@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="faq">
                <div className="container container-new">
                    <div className="row">
                        <div className="col-12">
                            <div className="faq-right">
                                <div className="faq-inner">
                                    {faqData?.length > 0 ? (
                                        <div className="accordion" id="accordionExample">
                                            {faqData?.map((item, index) => {
                                                return (
                                                    <div className="accordion-item" key={index}>
                                                        <h3
                                                            className="accordion-header"
                                                            id={`heading${index + 1}`}
                                                        >
                                                            <button
                                                                className="accordion-button collapsed"
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target={`#collapse${index + 1}`}
                                                                aria-expanded="true"
                                                                aria-controls={`collapse${index + 1}`}
                                                            >
                                                                {item?.title}
                                                            </button>
                                                        </h3>
                                                        <div
                                                            id={`collapse${index + 1}`}
                                                            className="accordion-collapse collapse"
                                                            aria-labelledby={`heading${index + 1}`}
                                                            data-bs-parent="#accordionExample"
                                                        >
                                                            <div className="accordion-body">
                                                                <div
                                                                    dangerouslySetInnerHTML={{ __html: item?.description }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <NodataFound msg="No faq's found!" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <WhyChoose />
        </>
    )
}

export default Policy