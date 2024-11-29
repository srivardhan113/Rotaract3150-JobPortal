import Register2 from "../../common/form/register/Register";
import MobileMenu from "../../header/MobileMenu";
import Header from "./Header";

const index = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <!--End Main Header -->  */}
      {/* <span className="header-span"></span> */}
      {/* <MobileMenu /> */}
      {/* End MobileMenu */}

      <div className="login-section">
        <div
          className="image-layer"
          style={{ backgroundImage: "url(/images-rotaract/login.jpg)" }}
        >
          <div className="text-center pt-120">
            <img
              width={400}
              height={180}
              src="/images-rotaract/ri3150-logo.png"
              alt="Rotaract Logo"
              className=""
            />
            <h1 className="pt-50  text-white">ROTARACT3150 - CAREER HUB</h1>
          </div>

        </div>
        <div className="outer-box">
          {/* <!-- Login Form --> */}
          <div className="login-form default-form">
            <Register2 />
          </div>
          {/* <!--End Login Form --> */}
        </div>
      </div>
      {/* <!-- End Info Section --> */}
    </>
  );
};

export default index;
