import React, { useState, useEffect } from 'react';
import Select from "react-select";
import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const CompanyProfileForm = () => {
    const [logoImg, setLogoImg] = useState("");
    const [converImg, setCoverImg] = useState("");
    const [logoPreview, setLogoPreview] = useState("");
    const selectInstanceId = "industry-select";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        website: "",
        establishedSince: "",
        teamSize: "0 - 100",
        industry: "",
        about: "",
        country: "Australia",
        city: "Melbourne",
        completeAddress: "",
        socialLinks: {
            facebook: "",
            linkedin: "",
            instagram: "",
            twitter: ""
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  

    // Fetch company profile on component mount
    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                const companyId = getCookie('companyId');
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/companies/get-company-profile?companyId=${companyId}&userId=${getCookie("userId")}`,
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("authToken")}`, // Example token
                    "Content-Type": "application/json",
                  }},);
              
                if (response.data.company) {
                    const { company } = response.data;
                    let industryString = company.industry || "";
                    console.log(industryString)
                    if (typeof industryString !== 'string') {
                        // If it's not a string (e.g., it's an array or null), convert to empty string
                        industryString = "";
                    }
                    setFormData({
                        name: company.name || "",
                        email:company.user.emailAddress || "",
                        phone: company.phone || "",
                        website: company.website || "",
                        establishedSince: company.establishedSince ? new Date(company.establishedSince).toISOString().split('T')[0] : "",
                        teamSize: company.teamSize || "0 - 100",
                        industry: industryString||"",
                        about: company.about || "",
                        country: company.country || "Australia",
                        city: company.city || "Melbourne",
                        completeAddress: company.completeAddress || "",
                        socialLinks: company.socialLinks.reduce((acc, link) => {
                            acc[link.platform.toLowerCase()] = link.url;
                            return acc;
                        }, {
                            facebook: "",
                            linkedin: "",
                            instagram: "",
                            twitter: ""
                        })
                    });
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load company profile");
            }
        };

        fetchCompanyProfile();
    }, []);
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
  console.log(states)
  const placeholders = {
    CompanyLegalNmae: "Enter Company Name",
    EmailAddress: "Email Address",
    Phone: "Enter Phone Number",
    Website: "Enter Website Name",
    EstSince: "Enter The Date Of Establishment",
    AboutCompany: "Description Of Your Company",
    completeAddress: "Enter Your Complete Address"
  };

  // State to track current placeholders
  const [currentPlaceholders, setCurrentPlaceholders] = useState(placeholders);

  // Handle focus - remove placeholder
  const handleFocus = (fieldName) => {
    setCurrentPlaceholders(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  // Handle blur - restore placeholder
  const handleBlur = (fieldName) => {
    setCurrentPlaceholders(prev => ({
      ...prev,
      [fieldName]: placeholders[fieldName]
    }));
  };

    // Handle logo upload
    const logoHandler = async (file) => {
        try {
            // Check file size (1MB = 1024 * 1024 bytes)
            if (file.size > 1024 * 1024) {
                setError("File size must be less than 1MB");
                return;
            }
    
            // Check file type
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                setError("Only JPG  files are allowed");
                return;
            }
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setLogoPreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
            const formData = new FormData();
            formData.append('companyId', getCookie('companyId'));
            formData.append('image', file);
       
    
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/companies/upload-image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
    
            if (response.data.data) {
                setLogoImg(file);
                // Optionally show success message
                 alert("Logo uploaded successfully!");
            }
        } catch (err) {
            console.error("Error uploading logo:", err);
            setError(err.response?.data?.message || "Failed to upload logo");
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === "country") {
            setFormData(prev => ({ ...prev, country: value,  city: "" }));
          } else if (name === "state") {
            setFormData(prev => ({ ...prev, city: value}));
          } 
    };

    // Handle social links changes
    const handleSocialLinkChange = (e) => {
        const { name, value } = e.target;
        console.log('Social link change:', { name, value });
        console.log('Previous formData:', formData);
        
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value
            }
        }));
    
        // Log after update
        console.log('Updated formData:', formData);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userId = getCookie('userId');
            const socialLinksArray = Object.entries(formData.socialLinks).map(([platform, url]) => ({
                platform,
                url
            }));

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/companies/create-company-profile`, {
                userId,
                ...formData,
                socialLinks: socialLinksArray
            },
            {
              headers: {
                Authorization: `Bearer ${getCookie("authToken")}`, // Example token
                "Content-Type": "application/json",
              }},);

            if (response.data) {
                window.location.reload;
                 alert("Profile updated successfully!");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            setError("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const catOptions = [
        { value: "Banking", label: "Banking" },
        { value: "Digital & Creative", label: "Digital & Creative" },
        { value: "Retail", label: "Retail" },
        { value: "Human Resources", label: "Human Resources" },
        { value: "Management", label: "Management" },
        { value: "Accounting & Finance", label: "Accounting & Finance" },
        { value: "Digital", label: "Digital" },
        { value: "Creative Art", label: "Creative Art" },
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
                        onChange={(e) => logoHandler(e.target.files[0])}
                    />
                   <label
    className="uploadButton-button ripple-effect"
    htmlFor="upload"
>
    {logoPreview ? (
        <img 
            src={logoPreview} 
            alt="Logo Preview" 
            style={{ 
                maxWidth: '100px', 
                maxHeight: '100px', 
                objectFit: 'contain' 
            }} 
        />
    ) : (
        "Browse Logo"
    )}
</label>
                    <span className="uploadButton-file-name"></span>
                </div>
                <div className="text">
                    Max file size is 1MB, Minimum dimension: 330x300 And
                    Suitable files are .jpg 
                </div>
            </div>

            <form className="default-form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-lg-6 col-md-12">
                        <label>Company Legal Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={currentPlaceholders.CompanyLegalNmae}
                            onFocus={() => handleFocus('CompanyLegalNmae')}
                            onBlur={() => handleBlur('CompanyLegalNmae')}
                            required
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                    <label>Email address</label>
                    <input
                        type="text"
                        name="name"
                        disabled={true}
                        value={formData.email}
                        placeholder={currentPlaceholders.EmailAddress}
                        onFocus={() => handleFocus('EmailAddress')}
                        onBlur={() => handleBlur('EmailAddress')}
                        required
                    />
                </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={currentPlaceholders.Phone}
                            onFocus={() => handleFocus('Phone')}
                            onBlur={() => handleBlur('Phone')}
                            required
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>Website</label>
                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder={currentPlaceholders.Website}
                            onFocus={() => handleFocus('Website')}
                            onBlur={() => handleBlur('Website')}
                            required
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>Est. Since</label>
                        <input
                            type="text"
                            name="establishedSince"
                            placeholder={currentPlaceholders.EstSince}
                            onFocus={() => handleFocus('EstSince')}
                            onBlur={() => handleBlur('EstSince')}
                            value={formData.establishedSince}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>Team Size</label>
                        <select 
                            className="chosen-single form-select" 
                            name="teamSize"
                            value={formData.teamSize}
                            onChange={handleInputChange}
                            required
                        >
                            <option>0 - 100</option>
                            <option>100 - 250</option>
                            <option>250 - 500</option>
                            <option>500 - 1000</option>
                            <option>1000 - 5000</option>
                            <option>5000+</option>
                        </select>
                    </div>
                    <div className="form-group col-lg-6 col-md-12">
                <label>Multiple Select Boxes</label>
                {console.log('Current formData.industry:', formData.industry)}
                <Select
                    instanceId={selectInstanceId}
                    value={
                        formData.industry 
                            ? formData.industry.split(',')
                                .filter(Boolean)
                                .map(industry => ({
                                    value: industry,
                                    label: industry
                                }))
                            : []
                    }
                    isMulti
                    name="industry"
                    options={catOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selected) => {
                        console.log('Selected values:', selected);
                        setFormData(prev => ({
                            ...prev,
                            industry: selected.map(item => item.value).join(',')
                        }));
                    }}
                />
            </div>

                    <div className="form-group col-lg-12 col-md-12">
                        <label>About Company</label>
                        <textarea 
                            name="about"
                            value={formData.about}
                            onChange={handleInputChange}
                            placeholder={currentPlaceholders.AboutCompany}
                            onFocus={() => handleFocus('AboutCompany')}
                            onBlur={() => handleBlur('AboutCompany')}
                            required
                        ></textarea>
                    </div>
                </div>

            
                {/* Social Links Section */}
                <div className="widget-title md-4 p-0">
                                        <h4>Social Network</h4>
                                    </div>
                <div className="row">
                    <div className="form-group col-lg-6 col-md-12">
                        <label>Facebook</label>
                        <input
                            type="text"
                            name="facebook"
                            value={formData.socialLinks.facebook}
                            onChange={handleSocialLinkChange}
                            placeholder="Facebook URL"
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>LinkedIn</label>
                        <input
                            type="text"
                            name="linkedin"
                            value={formData.socialLinks.linkedin}
                            onChange={handleSocialLinkChange}
                            placeholder="LinkedIn URL"
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>Instagram</label>
                        <input
                            type="text"
                            name="instagram"
                            value={formData.socialLinks.instagram}
                            onChange={handleSocialLinkChange}
                            placeholder="Instagram URL"
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>Twitter</label>
                        <input
                            type="text"
                            name="twitter"
                            value={formData.socialLinks.twitter}
                            onChange={handleSocialLinkChange}
                            placeholder="Twitter URL"
                        />
                    </div>
                </div>

                    {/* Address Section */}
                    <div className="ls-widget">
                    <div className="widget-title md-4 p-0">
                    <h4>Address</h4>
                    </div>
                    <div className="row">
                    <div className="form-group col-lg-6 col-md-12">
                        <label>Country</label>
                        <select 
                            className="chosen-single form-select"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
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
                        <label>State</label>
                        <select 
                            className="chosen-single form-select"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
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
                            placeholder={currentPlaceholders.completeAddress}
                            onFocus={() => handleFocus('completeAddress')}
                            onBlur={() => handleBlur('completeAddress')}
                            required
                        />
                    </div>
                </div>
                </div>

                {error && (
                    <div className="text-red-500 mb-4">{error}</div>
                )}

                <div className="text-center mt-4">
                    <button 
                        type="submit" 
                        className="theme-btn btn-style-one"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CompanyProfileForm;