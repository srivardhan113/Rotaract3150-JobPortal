import Login from "../../common/form/login/Loginpage";
import MobileMenu from "../../header/MobileMenu";
import Header from "./Header";

const index = () => {
  return (
    <>
      <Header />
      {/* <!--End Main Header -->  */}

      {/* <MobileMenu /> */}
      {/* End MobileMenu */}

      <div className="login-section ">
        <div
          className="image-layer"
          style={{ backgroundImage: "url(/images-rotaract/login.jpg)" }}
          
        ></div>
        <div className="outer-box">
          {/* <!-- Login Form --> */}
          <div className="login-form default-form">
            <Login/>
          </div>
          {/* <!--End Login Form --> */}
        </div>
      </div>
      {/* <!-- End Info Section --> */}
    </>
  );
};

export default index;
