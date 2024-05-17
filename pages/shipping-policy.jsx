import React from "react";
import SEOPart from "@/Components/SEOPart";
import { SeoData } from "@/SEOData/SeoData";
import Link from "next/link";

const ShippingPolicy = () => {
    return (
        <>
            <SEOPart data={SeoData?.shippingPolicy} />
            <div className="comm-banner">
                <img src="/images/contact.webp" alt="shipping" />
                <div className="container">
                    <div className="ban-text">
                        <h1>Shipping Policy</h1>
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
                                    <div className="shipping-policy">
                                        <div className="container">
                                            <div className="terms">
                                                <h2>Shipping Methods:</h2>
                                                <p>
                                                    We offer several shipping methods to cater to your needs:
                                                </p>
                                                <ul>
                                                    <li> Standard Shipping: Typically takes 5 business days for delivery.</li>
                                                    <li>Express Shipping: Delivers within 5 business days for expedited delivery. Additional charges may apply.</li>
                                                </ul>
                                                <h2>Shipping Regions:</h2>
                                                <p>
                                                    We currently ship within india. For international shipping, please contact our customer support team for assistance.
                                                </p>
                                                <h2>Content Liability:</h2>
                                                <p>
                                                    Shipping charges vary based on the shipping method selected, destination, and order weight. You can view the shipping charges during the checkout process before finalizing your purchase.
                                                </p>
                                                <h2>Order Processing Time:</h2>
                                                <p>
                                                    Orders are processed within 5 business days after payment confirmation. Please note that orders placed on weekends or holidays will be processed on the next business day.
                                                </p>
                                                <h2> Tracking Your Order:</h2>
                                                <p>
                                                    Once your order is shipped, you will receive a shipping confirmation email containing a tracking number. You can use this tracking number to monitor the status and location of your package.
                                                </p>
                                                <h2>Delivery Timeframe:</h2>
                                                <p>
                                                    The estimated delivery timeframe depends on the shipping method selected and your location. While we make every effort to deliver your order promptly, please understand that unforeseen circumstances such as weather delays or logistical issues may affect delivery times.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShippingPolicy;
