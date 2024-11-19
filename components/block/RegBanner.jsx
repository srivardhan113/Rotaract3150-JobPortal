import Image from "next/image";
import Link from "next/link";

const RegBanner = () => {
  const regBannerContent = [
    {
      id: 1,
      bgImage: `url("/images/index-13/banner/bg-1.png")`,
      name: "Employers",
      text: ` Join Rotaract 3150 - Job Portal to post job opportunities and connect with passionate, skilled candidates who are eager to make an impact.`,
      avatar: "/images/resource/employ.png",
      bannerClass: "banner-style-one",
      width: "221",
      height: "281",
    },
    {
      id: 2,
      bgImage: `url("/images/index-13/banner/bg-2.png")`,
      name: "Candidate",
      text: ` Register Now as a Rotaract Member to unlock job opportunities, enhance your career, and contribute to your community while building your professional network.`,
      avatar: "/images/resource/candidate.png",
      bannerClass: "banner-style-two dark",
      width: "207",
      height: "283",
    },
  ];
  return (
    <>
      {regBannerContent.map((item) => (
        <div
          className={`${item.bannerClass} -type-2 col-lg-6 col-md-12 col-sm-12`}
          key={item.id}
        >
          <div
            className="inner-box"
            style={{
              backgroundImage: item.bgImage,
            }}
          >
            <div className="content">
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <Link href="/register" className="theme-btn btn-style-five">
                Register Account
              </Link>
            </div>
            <figure className="image">
              <Image
                width={item.width}
                height={item.height}
                src={item.avatar}
                alt="resource"
              />
            </figure>
          </div>
        </div>
      ))}
    </>
  );
};

export default RegBanner;
