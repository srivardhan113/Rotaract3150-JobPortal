import Image from "next/image";

const ImageBox = () => {
  return (
    <div className="image-box">
      <div className="row">
        <div
          className="column col-lg-6 col-md-6 col-sm-12"
          data-aos-delay="1500"
          data-aos="fade-right"
        >
          <figure className="image">
            <Image
              width={317}
              height={449}
              src="/images/hero/1-hero.jpg"
              alt="resource"
            />
          </figure>
        </div>
        <div
          className="column col-lg-6 col-md-6 col-sm-12"
          data-aos-delay="2000"
          data-aos="fade-left"
        >
          <figure className="image">
            <Image
              width={317}
              height={302}
              src="/images/hero/2-hero.jpg"
              alt="resource"
            />
          </figure>
          <figure className="image">
            <Image
              width={317}
              height={302}
              src="/images/hero/3-hero.jpg"
              alt="resource"
            />
          </figure>
        </div>
      </div>

      {/* <!-- Info BLock One --> */}
      <div className="info_block" data-aos-delay="2500" data-aos="fade-in">
        <span className="icon flaticon-email-3"></span>
        <p>
          Send your Resume!! <br />
          Get the Chance!!
          
        </p>
      </div>

      {/* <!-- Info BLock Two --> */}
      {/* <div className="info_block_two" data-aos-delay="3000" data-aos="fade-in">
      {/* <span className="icon flaticon-email-3"></span> */}
        {/* <p>A Place for Future and Passion <br /> For you from Rotaract  </p> */}
        {/* <div className="image"> */}
          {/* <Image
            width={206}
            height={53}
            // src="/images/resource/multi-peoples.png"
            alt="resource"
          /> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default ImageBox;
