function LoginLayout(props) {
  return (
    <div className={`signup-box ${props?.className}`}>
      <div className="container container-login position-relative">
        <span className="sign-bg"></span>
        <div className="row">
          <div className="col-lg-7 order-lg-1 order-2">
            <div className="log-left">
              <h2>Fast Buy</h2>
              <h3>Make your every moment a special occasion with our sarees</h3>
              <div className="log-left-item-cont">
                <div className="log-left-item">
                  <img src="/images/free-shipping.webp" alt="free-shipping" />
                  <p>Free shipping</p>
                </div>

                <div className="log-left-item">
                  <img src="/images/quality.webp" alt="quality" />
                  <p>Quality Product</p>
                </div>

                <div className="log-left-item">
                  <img src="/images/easy-return.webp" alt="easy-return" />
                  <p>Easy Return Process</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 order-lg-2 order-1">{props?.children}</div>
        </div>
        <span className="log-underline"></span>
      </div>
    </div>
  );
}

export default LoginLayout;
