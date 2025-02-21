
'use client'

import { useState } from "react";

import FormInfoBox from "./FormInfoBox";
import LogoUpload from "./LogoUpload";
import Select from "react-select";

const index = () => {
  const [logImg, setLogoImg] = useState("");
  const logImgHander = (e) => {
      setLogoImg(e.target.files[0]);
  };
  const catOptions = [
    { value: "Software Development", label: "Software Development" },
    { value: "Data Science & Analytics", label: "Data Science & Analytics" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Hardware Engineering", label: "Hardware Engineering" },
    { value: "Film Making & Production", label: "Film Making & Production" },
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Business Development", label: "Business Development" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Finance & Accounting", label: "Finance & Accounting" },
    { value: "Project Management", label: "Project Management" },
    { value: "Sales & Marketing", label: "Sales & Marketing" },
    { value: "Content Writing", label: "Content Writing" },
    { value: "Game Development", label: "Game Development" },
    { value: "IT Support & Networking", label: "IT Support & Networking" },
    { value: "Civil Engineering", label: "Civil Engineering" },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    { value: "Customer Service", label: "Customer Service" },
    { value: "Education & Training", label: "Education & Training" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Legal", label: "Legal" },
    { value: "Logistics & Supply Chain", label: "Logistics & Supply Chain" },
    { value: "Architecture", label: "Architecture" },
    { value: "Environmental Science", label: "Environmental Science" },
    { value: "Journalism & Media", label: "Journalism & Media" },
    { value: "Hospitality & Tourism", label: "Hospitality & Tourism" }
    
  ];
  return (
    <div className="widget-content">
       <div className="uploading-outer">
                <div className="uploadButton">
                    <input
                        className="uploadButton-input"
                        type="file"
                        name="attachments[]"
                        accept="image/*"
                        id="upload"
                        required
                        onChange={logImgHander}
                    />
                    <label
                        className="uploadButton-button ripple-effect"
                        htmlFor="upload"
                    >
                        {logImg !== "" ? logImg.name : "Upload Image"}
                    </label>
                    <span className="uploadButton-file-name"></span>
                </div>
                <div className="text">
                    Max file size is 1MB, Minimum dimension: 330x300 And
                    Suitable files are .jpg & .png
                </div>
            </div>
      {/* End logo and cover photo components */}

      <form action="#" className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Legal Name</label>
          <input type="text" name="name" placeholder="Jerome" required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Title</label>
          <input type="text" name="name" placeholder="UI Designer" required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Phone Number</label>
          <input
            type="text"
            name="name"
            placeholder="0 123 456 7890"
            required
          />
        </div>



        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input
            type="text"
            name="name"
            disabled={true}
            placeholder="creativelayers"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Personal Website</label>
          <input
            type="text"
            name="name"
            placeholder="www.sripto.com"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Current Salary(₹)</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Current Amount" 
            required 
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Expected Salary(₹)</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Expected Amount" 
            required 
          />
        </div>

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <input type="text" name="name" placeholder="5-10 Years" required />
        </div> */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Age</label>
          <select className="chosen-single form-select" required>
            <option>12 - 18 Years</option>
            <option>18 - 21 Years</option>
            <option>21 - 25 Years</option>
            <option>25 - 28 Years</option>
            <option>28 - 35 Years</option>
            <option>35 Years +</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Education Levels</label>
          <input type="text" name="name" placeholder="B.Tech Degree completed" required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Languages</label>
          <input
            type="text"
            name="name"
            placeholder="English, Telugu"
            required
          />
        </div>

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Skills </label>
          <Select
            defaultValue={[catOptions[1]]}
            isMulti
            name="colors"
            options={catOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            required
          />
        </div>


        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Allow In Search & Listing</label>
          <select className="chosen-single form-select" required>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div> */}

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
        </div>




        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div> */}
      
{/* 
<-----------------------------------------------------------------------------------------------------------/> */}

        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter Country" 
            required 
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>State</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter State" 
            required 
          />
        </div>


        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter City" 
            required 
          />
        </div>


        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="name"
            placeholder="Door No. 143.143, Lakshmi Mohan Residency, Tilak Road"
            required
          />
        </div>

{/* 
<-----------------------------------------------------------------------------------------------------------/> */}



        </div>
    </form>
      {/* compnay info box */}

      

      


    </div>
  );
};

export default index;
