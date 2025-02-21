"use client";

import { useState,useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const PostBoxForm = () => {
  const [formData, setFormData] = useState({
    jobRoleTitle: "",
    jobDescription: "",
    keyResponsibilities: "",
    skillsAndExperience: "",
    emailAddress: "",
    specialisms: "",
    jobType: "",
    offeredSalary: "",
    careerLevel: "",
    experience: "",
    gender: "",
    industry: "",
    qualification: "",
    applicationDeadline: "",
    country: "",
    city: "",
    completeAddress: ""
  });
    const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const API_KEY = "NkxnUTNTUk91U3JHTHk0T0s4WlcyaHRZaEdWRkg0NE1JQ1hwa3Y1SA==";
  // Fetch Countries
  useEffect(() => {
      fetch("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY": API_KEY,
        },
      })
        .then((response) => response.json())
        .then((data) => setCountries(data))
        .catch((err) => console.error("Error fetching countries:", err));
    }, []);
    
    // Fetch States when country changes
    useEffect(() => {
      if (formData.country) {
        fetch(`https://api.countrystatecity.in/v1/countries/${formData.country}/states`, {
          headers: {
            "X-CSCAPI-KEY": API_KEY,
          },
        })
          .then((response) => response.json())
          .then((data) => setStates(data))
          .catch((err) => console.error("Error fetching states:", err));
      } else {
        setStates([]);
      }
    }, [formData.country]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const specialisms = [
    {
      value: "Arts, Media, and Entertainment",
      label: "Arts, Media, and Entertainment",
    },
    {
      value: "Business, Management, and Finance",
      label: "Business, Management, and Finance",
    },
    {
      value: "Science, Technology, and Engineering",
      label: "Science, Technology, and Engineering",
    },
    {
      value: "Healthcare, Life Sciences, and Social Work",
      label: "Healthcare, Life Sciences, and Social Work",
    },
    {
      value: "Education, Research, and Academia",
      label: "Education, Research, and Academia",
    },
    {
      value: "Law, Governance, and Policy",
      label: "Law, Governance, and Policy",
    },
    {
      value: "Trades, Skilled Labor, and Logistics",
      label: "Trades, Skilled Labor, and Logistics",
    },
    {
      value: "Environment, Agriculture, and Natural Sciences",
      label: "Environment, Agriculture, and Natural Sciences",
    },
    {
      value: "Sports, Fitness, and Recreation",
      label: "Sports, Fitness, and Recreation",
    },
    {
      value: "Hospitality, Tourism, and Customer Service",
      label: "Hospitality, Tourism, and Customer Service",
    },
    {
      value: "Gaming, Esports, and Digital Entertainment",
      label: "Gaming, Esports, and Digital Entertainment",
    },
    {
      value: "Entrepreneurship and Startups",
      label: "Entrepreneurship and Startups",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "country") {
      setFormData(prev => ({ ...prev, country: value,  city: "" }));
    } else if (name === "state") {
      setFormData(prev => ({ ...prev, city: value}));
    } 
  };

  const handleSelectChange = (selectedOptions, actionMeta) => {
    if (actionMeta.name === "specialisms" || actionMeta.name === "industry") {
      const values = selectedOptions.map(option => option.value).join(", ");
      setFormData(prev => ({
        ...prev,
        [actionMeta.name]: values
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Validate all required fields are present
      const requiredFields = [
         "jobRoleTitle", "jobDescription", "keyResponsibilities",
        "skillsAndExperience", "emailAddress", "specialisms", "jobType",
        "offeredSalary", "careerLevel", "experience", "gender", "industry",
        "qualification", "applicationDeadline", "country", "city", "completeAddress"
      ];

      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        setError(`Missing required fields: ${missingFields.join(", ")}`);
        return;
      }

      // Format the data as needed
      const submitData = {
        ...formData,
        companyId: parseInt(sessionStorage.getItem("companyId")),
        offeredSalary: parseFloat(formData.offeredSalary),
      };

      // Make the API call
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/companyjob/postJob?userId=${sessionStorage.getItem("userId")}`, submitData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Example token
            "Content-Type": "application/json",
          }},);
      console.log(response);
      setSuccess("Job posted successfully!");
      // Optionally reset form
      setFormData({
        jobRoleTitle: "",
        jobDescription: "",
        keyResponsibilities: "",
        skillsAndExperience: "",
        emailAddress: "",
        specialisms: "",
        jobType: "",
        offeredSalary: "0",
        careerLevel: "",
        experience: "",
        gender: "",
        industry: "",
        qualification: "",
        applicationDeadline: "",
        country: "",
        city: "",
        completeAddress: ""
      });

    } catch (err) {
      setError(err.response?.data?.error || "Failed to create job posting");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="row">

        <div className="form-group col-lg-12 col-md-12">
          <label>Job Role Title</label>
          <input 
            type="text" 
            name="jobRoleTitle" 
            value={formData.jobRoleTitle}
            onChange={handleInputChange}
            placeholder="Title" 
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea 
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            placeholder="Enter job description"
          ></textarea>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Key Responsibilities</label>
          <textarea 
            name="keyResponsibilities"
            value={formData.keyResponsibilities}
            onChange={handleInputChange}
            placeholder="Enter key responsibilities"
          ></textarea>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Skill & Experience</label>
          <textarea 
            name="skillsAndExperience"
            value={formData.skillsAndExperience}
            onChange={handleInputChange}
            placeholder="Enter required skills and experience"
          ></textarea>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Email Address</label>
          <input 
            type="email" 
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleInputChange}
            placeholder="Enter email address" 
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Specialisms</label>
          <Select
            isMulti
            name="specialisms"
            options={specialisms}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
            value={specialisms.filter(option => 
              formData.specialisms.includes(option.value)
            )}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          <select 
            className="chosen-single form-select"
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Offered Salary</label>
          <input
            type="number"
            name="offeredSalary"
            value={formData.offeredSalary}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter Offered Salary"
            min="0"
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Career Level</label>
          <select 
            className="chosen-single form-select"
            name="careerLevel"
            value={formData.careerLevel}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <select 
            className="chosen-single form-select"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="0 years">No Experience</option>
            <option value="0-1 years">0-1 Years</option>
            <option value="1-2 Years">1-2 Years</option>
            <option value="2-5 Years">2-5 Years</option>
            <option value="5-10 Years">5-10 Years</option>
            <option value="10+ Years">10+ Years</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <select 
            className="chosen-single form-select"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Industry</label>
          <Select
            isMulti
            name="industry"
            options={specialisms}  // Using same options as specialisms
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSelectChange}
            value={specialisms.filter(option => 
              formData.industry.includes(option.value)
            )}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <select 
            className="chosen-single form-select"
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="High School">High School</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate">Doctorate</option>
          </select>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label className="me-2">Application Deadline Date</label>
          <input 
            type="date" 
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select 
            className="chosen-single form-select"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
                                            <option value="">Select your country</option>
    {countries.map((country) => (
      <option key={country.iso2} value={country.iso2}>
        {country.name}
      </option>
    ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select 
            className="chosen-single form-select"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          >
                <option value="">Select your state</option>
                {Array.isArray(states) && states.map((state) => (
                            <option key={state.iso2} value={state.iso2}>
                                {state.name}
                            </option>
                        ))}
          </select>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="completeAddress"
            value={formData.completeAddress}
            onChange={handleInputChange}
            placeholder="Enter complete address"
          />
        </div>

        <div className="form-group col-lg-12 col-md-12 text-right">
          <button 
            type="submit" 
            className="theme-btn btn-style-one"
            disabled={isLoading}
          >
            {isLoading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;