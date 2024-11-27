
'use client'

// import Map from "../../../Map";
import Select from "react-select";

const PostBoxForm = () => {
  const specialisms = [
    { value: "Arts, Media, and Entertainment", label: "Arts, Media, and Entertainment" },
    { value: "Business, Management, and Finance", label: "Business, Management, and Finance" },
    { value: "Science, Technology, and Engineering", label: "Science, Technology, and Engineering" },
    { value: "Healthcare, Life Sciences, and Social Work", label: "Healthcare, Life Sciences, and Social Work" },
    { value: "Education, Research, and Academia", label: "Education, Research, and Academia" },
    { value: "Law, Governance, and Policy", label: "Law, Governance, and Policy" },
    { value: "Trades, Skilled Labor, and Logistics", label: "Trades, Skilled Labor, and Logistics" },
    { value: "Environment, Agriculture, and Natural Sciences", label: "Environment, Agriculture, and Natural Sciences" },
    { value: "Sports, Fitness, and Recreation", label: "Sports, Fitness, and Recreation" },
    { value: "Hospitality, Tourism, and Customer Service", label: "Hospitality, Tourism, and Customer Service" },
    { value: "Gaming, Esports, and Digital Entertainment", label: "Gaming, Esports, and Digital Entertainment" },
    { value: "Entrepreneurship and Startups", label: "Entrepreneurship and Startups" }
];


  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Role Title</label>
          <input type="text" name="name" placeholder="Title" />
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Key Responsibilities</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Skill & Experience</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input type="text" name="name" placeholder="" />
        </div>

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Username</label>
          <input type="text" name="name" placeholder="" />
        </div> */}

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Specialisms </label>
          <Select
            defaultValue={[specialisms[2]]}
            isMulti
            name="colors"
            options={specialisms}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>Freelancer</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Passion</option>
            <option>Temporary</option>
          </select>
        </div>


        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Offered Salary</label>
          <input 
            type="number" 
            className="form-control" 
            placeholder="Enter Offered Salary" 
            min="0" 
            step="999999999" 
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Career Level</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>Entry Level</option>
            <option>Intern</option>
            <option>Junior</option>
            <option>Mid Level</option>
            <option>Senior</option>
            <option>Super Expert</option>
          </select>
        </div>


        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>No Experience</option>
            <option>Less than 1 Year</option>
            <option>1-2 Years</option>
            <option>2-5 Years</option>
            <option>5-10 Years</option>
            <option>10+ Years</option>
          </select>
        </div>


        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Industry</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>Information Technology</option>
            <option>Creative Arts & Media</option>
            <option>Engineering & Manufacturing</option>
            <option>Marketing & Advertising</option>
            <option>Finance & Banking</option>
            <option>Healthcare & Life Sciences</option>
            <option>Retail & Consumer Goods</option>
            <option>Education & Training</option>
            <option>Entertainment & Film</option>
            <option>Hospitality & Tourism</option>
            <option>Logistics & Supply Chain</option>
            <option>Others</option>

          </select>
        </div>


        <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <select className="chosen-single form-select">
            <option>Select</option>
            <option>High School</option>
            <option>Associate Degree</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>Doctorate (PhD)</option>
            <option>Diploma</option>
            <option>Certification</option>
            <option>Professional Degree</option>
          </select>
        </div>


        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Application Deadline Date</label>
          <input type="text" name="name" placeholder="06.04.2020" />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select className="chosen-single form-select">
            <option>Australia</option>
            <option>Pakistan</option>
            <option>Chaina</option>
            <option>Japan</option>
            <option>India</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select className="chosen-single form-select">
            <option>Melbourne</option>
            <option>Pakistan</option>
            <option>Chaina</option>
            <option>Japan</option>
            <option>India</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="name"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
          />
        </div>

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Find On Map</label>
          <input
            type="text"
            name="name"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
          />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-3 col-md-12">
          <label>Latitude</label>
          <input type="text" name="name" placeholder="Melbourne" />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-3 col-md-12">
          <label>Longitude</label>
          <input type="text" name="name" placeholder="Melbourne" />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-12 col-md-12">
          <button className="theme-btn btn-style-three">Search Location</button>
        </div> */}

        {/* <div className="form-group col-lg-12 col-md-12">
          <div className="map-outer">
            <div style={{ height: "420px", width: "100%" }}>
              <Map />
            </div>
          </div>
        </div> */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button className="theme-btn btn-style-one">Next</button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
