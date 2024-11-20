import dynamic from "next/dynamic";
import FormContent2 from "@/components/common/form/login/FormContent2";
import MobileMenu from "@/components/header/MobileMenu";
import Header from "@/components/pages-menu/login/Header";

export const metadata = {
  title: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
  description: "Rotaract3150 || Job portal || Sri Vardhan Yeluri || SRIPTO",
};

const IndexPage = () => {
  return (
    <>
      <Header />
      {/* End Main Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <div className="login-section">
        {/* Image layer with proper background styling */}
        <div
          className="image-layer"
          style={{
            backgroundImage: "url(/images/background/12.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="outer-box">
          {/* Login Form */}
          <div className="login-form default-form">
            <FormContent2 />
          </div>
        </div>
      </div>
      {/* End Info Section */}
    </>
  );
};

// Dynamically load the IndexPage without server-side rendering
export default dynamic(() => Promise.resolve(IndexPage), { ssr: false });
