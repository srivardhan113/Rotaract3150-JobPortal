'use client'

import { useState,useEffect } from "react";
import { Alert } from "bootstrap";

import Select from "react-select";
import MobileMenu from "/components/dashboard-pages/mobileheader";
import DashboardCandidatesSidebar from "/app/candidates-dashboard/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "/components/dashboard-pages/dashboardheader";
import MenuToggler from "../../MenuToggler";
import Achievements from "./components/career-data/Achievements";
import Social from "./components/my-profile/SocialNetworkBox";
import Education from "./components/career-data/Education";
import Experiences from "./components/career-data/Experiences";
import Skills from "./components/career-data/SkillsMultiple";
import axios from "axios";
// Experience Form Component
export const ExperienceForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    startYear: '',
    endYear: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      jobTitle: '',
      companyName: '',
      startYear: '',
      endYear: '',
      description: ''
    });
  };

  return (
    <div className="resume-block">
      <div className="inner">
        <form onSubmit={handleSubmit} className="default-form">
          <div className="row">
            {/* Job Title Input */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                placeholder="e.g., Senior Software Engineer"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Company Name Input */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                placeholder="e.g., Google Inc."
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Start Year */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Start Year</label>
              <input
                type="text"
                name="startYear"
                value={formData.startYear}
                onChange={(e) => setFormData({...formData, startYear: e.target.value})}
                placeholder="e.g., 2020"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* End Year */}
            <div className="form-group col-lg-6 col-md-12">
              <label>End Year</label>
              <input
                type="text"
                name="endYear"
                value={formData.endYear}
                onChange={(e) => setFormData({...formData, endYear: e.target.value})}
                placeholder="e.g., 2023 (or Present)"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Description */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your role, responsibilities, and achievements"
                className="w-full px-3 py-2 border rounded"
                rows="4"
              />
            </div>

            {/* Submit Buttons */}
            <div className="form-group col-lg-12 col-md-12">
              <div className="flex gap-3">
                <button 
                  type="submit" 
                  className="theme-btn btn-style-one m-2"
                >
                  Add Experience
                </button>
                <button 
                  type="button" 
                  onClick={onCancel}
                  className="theme-btn btn-style-three m-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
// Achievement Form Component
export const AchievementForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      title: '',
      year: '',
      description: ''
    });
  };

  return (
    <div className="resume-block">
      <div className="inner">
        <form onSubmit={handleSubmit} className="default-form">
          <div className="row">
            {/* Achievement Title */}
            <div className="form-group col-lg-8 col-md-12">
              <label>Achievement Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Best Developer Award"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Year */}
            <div className="form-group col-lg-4 col-md-12">
              <label>Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                placeholder="e.g., 2023"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Description */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your achievement and its significance"
                className="w-full px-3 py-2 border rounded"
                rows="4"
              />
            </div>

            {/* Submit Buttons */}
            <div className="form-group col-lg-12 col-md-12">
              <div className="flex gap-3">
                <button 
                  type="submit" 
                  className="theme-btn btn-style-one m-2"
                >
                  Add Achievement
                </button>
                <button 
                  type="button" 
                  onClick={onCancel}
                  className="theme-btn btn-style-three m-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
const EducationForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    startYear: '',
    endYear: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
      description: ''
    });
  };

  return (
    <div className="resume-block">
      <div className="inner">
        <form onSubmit={handleSubmit} className="default-form">
          <div className="row">
            {/* Degree Input */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={(e) => setFormData({...formData, degree: e.target.value})}
                placeholder="e.g., Bachelor of Science in Computer Science"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Institution Input */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Institution</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
                placeholder="e.g., Stanford University"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Start Year */}
            <div className="form-group col-lg-6 col-md-12">
              <label>Start Year</label>
              <input
                type="text"
                name="startYear"
                value={formData.startYear}
                onChange={(e) => setFormData({...formData, startYear: e.target.value})}
                placeholder="e.g., 2018"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* End Year */}
            <div className="form-group col-lg-6 col-md-12">
              <label>End Year</label>
              <input
                type="text"
                name="endYear"
                value={formData.endYear}
                onChange={(e) => setFormData({...formData, endYear: e.target.value})}
                placeholder="e.g., 2022 (or Present)"
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Description */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of your studies, achievements, etc."
                className="w-full px-3 py-2 border rounded"
                rows="4"
              />
            </div>

            {/* Submit Buttons */}
            <div className="form-group col-lg-12 col-md-12">
              <div className="flex gap-3">
                <button 
                  type="submit" 
                  className="theme-btn btn-style-one m-2"
                >
                  Add Education
                </button>
                <button 
                  type="button" 
                  onClick={onCancel}
                  className="theme-btn btn-style-three m-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const index = () => {
      const [logoImg, setLogoImg] = useState("");
      const [converImg, setCoverImg] = useState("");
      const [logoPreview, setLogoPreview] = useState("");
      const [showEducationForm, setShowEducationForm] = useState(false);
      const [pshow,setpshow]=useState(false);
      
  const [input, setInput] = useState('');

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
            formData.append('image', file);
            formData.append('userId', sessionStorage.getItem('userId'));
    
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/update-user-image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
    
            if (response.data.data) {
                setLogoImg(file);
               setpshow(true);
            }
        } catch (err) {
            console.error("Error uploading logo:", err);
            setError(err.response?.data?.message || "Failed to upload logo");
        }
    };
    const [profile, setProfile] = useState({
      applicantProfile: {
        fullLegalName: '',
        jobTitle: '',
        phoneNumber: '',
        emailAddress: '',
        personalWebsite: '',
        currentSalary: '',
        expectedSalary: '',
        ageRange: '',
        educationLevels: '',
        languages: '',
        skills: [],
        description: '',
        completeAddress: '',
        country: '',
        state: '',
        city: ''
      },
      education: [],
      experiences: [],
      achievements: [],
      socialLinks: []
    });
    const [showExperienceForm, setShowExperienceForm] = useState(false);
const [showAchievementForm, setShowAchievementForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');
  // const handleInputChange = (e) => {
  //   setInput(e.target.value);
  // };
  const ageRangeOptions = [
    { value: '12-18', label: '12 - 18 Years' },
    { value: '18-21', label: '18 - 21 Years' },
    { value: '21-25', label: '21 - 25 Years' },
    { value: '25-28', label: '25 - 28 Years' },
    { value: '28-35', label: '28 - 35 Years' },
    { value: '35+', label: '35 Years +' }
  ];
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/getuserprofile?userId=${sessionStorage.getItem('userId')}&id=${sessionStorage.getItem('userId')}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Example token
            "Content-Type": "application/json",
          }},);
        
        // Transform skills string to array of objects for react-select
        const skillsArray = response.data.applicantProfile.skills
          .split(',')
          .map(skill => skill.trim())
          .map(skill => ({ value: skill, label: skill }));
  
        setProfile({
          ...response.data,
          applicantProfile: {
            ...response.data.applicantProfile,
            skillsForSelect: skillsArray // Add new property for react-select
          }
        });
      } catch (err) {
        // setError('Failed to load profile data');
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    if (sessionStorage.getItem("userId")) {
      fetchProfile();
    }
  }, []);
  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter' && input.trim()) {
  //     setSkills([...skills, input.trim()]);
  //     setInput('');
  //   }
  // };
  const handleAddExperience = (newExperience) => {
    handleAddSection('experiences', newExperience);
    setShowExperienceForm(false);
  };
  
  const handleAddAchievement = (newAchievement) => {
    handleAddSection('achievements', newAchievement);
    setShowAchievementForm(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setError('User not logged in');
      return;
    }
  
    try {
      setLoading(true);
      
      // Transform skills back to string format for API
      const submitData = {
        ...profile,
        applicantProfile: {
          ...profile.applicantProfile,
          skills: profile.applicantProfile.skillsForSelect
            ?.map(skill => skill.value)
            .join(', ') || ''
        }
      };
  
      // Remove any temporary properties
      delete submitData.applicantProfile.skillsForSelect;
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/createUserProfile`,
        {
          userId,
          ...submitData
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Example token
            "Content-Type": "application/json",
          }},
      );
  
      if (response.data) {
        // alert('Profile updated successfully!');
      }
    } catch (err) {
      setError('Failed to update profile');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  
  // const handleRemoveSkill = (skill) => {
  //   setSkills(skills.filter(s => s !== skill));
  // };
  
  // const logImgHander = (e) => {
  //     setLogoImg(e.target.files[0]);
  // };
  const handleInputChange = (e, section = 'applicantProfile') => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };
  const handleAddEducation = (newEducation) => {
    handleAddSection('education', newEducation);
    setShowEducationForm(false);
  };
  // Handle adding new sections (education, experience, achievements)
  const handleAddSection = (section, newItem) => {
    setProfile(prev => {
      // Get highest ID in current section
      const maxId = Math.max(...prev[section].map(item => item.id), 0);
      const newId = maxId + 1;
  
      // Check for duplicates (basic check - you might want to customize this)
      const isDuplicate = prev[section].some(item => 
        JSON.stringify({ ...item, id: undefined }) === 
        JSON.stringify({ ...newItem, id: undefined })
      );
  
      if (isDuplicate) {
        alert(`This ${section} entry already exists!`);
        return prev;
      }
  
      return {
        ...prev,
        [section]: [...prev[section], { ...newItem, id: newId }]
      };
    });
  };

  // Handle removing sections
  const handleRemoveSection = (section, id) => {
    setProfile(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id),
      toDelete: {
        ...prev.toDelete,
        [section]: [...(prev.toDelete?.[section] || []), id]
      }
    }));
  };

  // Handle skills
  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };
  // Handle social links changes
// Handle social link changes
const handleSocialLinkChange = (e, index) => {
  const { name, value } = e.target;
  setProfile(prev => {
    const updatedLinks = [...prev.socialLinks];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [name]: value
    };
    return {
      ...prev,
      socialLinks: updatedLinks
    };
  });
};
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  const skillOptions = [
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
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="My Profile!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>My Profile</h4>
                  </div>
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
                    {
                  pshow&&<div className="text">
                    <p className="text-danger">Profile updated succefuly</p>
                    </div>
                }
                </div>
                
            </div>
      {/* End logo and cover photo components */}

      <form onSubmit={handleSubmit} className="default-form">
      
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Legal Name</label>
          <input
            type="text"
            name="fullLegalName"
            value={profile.applicantProfile.fullLegalName}
            onChange={(e) => handleInputChange(e)}
            placeholder="Jerome"
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={profile.applicantProfile.jobTitle}
            onChange={(e) => handleInputChange(e)}
            placeholder="UI Designer"
            required
          />
        </div>

        {/* <!-- Input --> */}
    {/* Phone Number */}
<div className="form-group col-lg-6 col-md-12">
  <label>Phone Number</label>
  <input
    type="text"
    name="phoneNumber"
    value={profile.applicantProfile.phoneNumber}
    onChange={(e) => handleInputChange(e)}
    placeholder="0 123 456 7890"
    required
  />
</div>

{/* Email Address */}
<div className="form-group col-lg-6 col-md-12">
  <label>Email address</label>
  <input
    type="text"
    name="emailAddress"
    value={profile.applicantProfile.emailAddress}
    disabled={true}
    onChange={(e) => handleInputChange(e)}
    placeholder="creativelayers"
    required
  />
</div>

{/* Personal Website */}
<div className="form-group col-lg-6 col-md-12">
  <label>Personal Website</label>
  <input
    type="text"
    name="personalWebsite"
    value={profile.applicantProfile.personalWebsite}
    onChange={(e) => handleInputChange(e)}
    placeholder="www.sripto.com"
    required
  />
</div>

{/* Current Salary */}
<div className="form-group col-lg-3 col-md-12">
  <label>Current Salary(₹)</label>
  <input 
    type="text" 
    className="form-control"
    name="currentSalary"
    value={profile.applicantProfile.currentSalary}
    onChange={(e) => handleInputChange(e)}
    placeholder="Current Amount" 
    required 
  />
</div>

{/* Expected Salary */}
<div className="form-group col-lg-3 col-md-12">
  <label>Expected Salary(₹)</label>
  <input 
    type="text" 
    className="form-control"
    name="expectedSalary"
    value={profile.applicantProfile.expectedSalary}
    onChange={(e) => handleInputChange(e)}
    placeholder="Expected Amount" 
    required 
  />
</div>

{/* Age */}
<div className="form-group col-lg-6 col-md-12">
  <label>Age</label>
  <select 
    className="chosen-single form-select"
    name="ageRange"
    value={profile.applicantProfile.ageRange}
    onChange={(e) => handleInputChange(e)}
    required
  >
    <option>12 - 18 Years</option>
    <option>18 - 21 Years</option>
    <option>21 - 25 Years</option>
    <option>25 - 28 Years</option>
    <option>28 - 35 Years</option>
    <option>35 Years +</option>
  </select>
</div>

{/* Education Levels */}
<div className="form-group col-lg-6 col-md-12">
  <label>Education Levels</label>
  <select
    name="educationLevels"
    value={profile.applicantProfile.educationLevels}
    onChange={(e) => handleInputChange(e)}
    required
  >
    <option value="">Select Education Level</option>
    <option value="10th">10th (Secondary School)</option>
    <option value="12th">12th (Higher Secondary)</option>
    <option value="Diploma">Diploma</option>
    <option value="BTech">B.Tech / B.E (Engineering)</option>
    <option value="BSc">B.Sc (Bachelor of Science)</option>
    <option value="BCom">B.Com (Bachelor of Commerce)</option>
    <option value="BA">B.A (Bachelor of Arts)</option>
    <option value="BBA">BBA (Bachelor of Business Administration)</option>
    <option value="BCA">BCA (Bachelor of Computer Applications)</option>
    <option value="MTech">M.Tech / M.E (Master of Engineering)</option>
    <option value="MSc">M.Sc (Master of Science)</option>
    <option value="MCom">M.Com (Master of Commerce)</option>
    <option value="MA">M.A (Master of Arts)</option>
    <option value="MBA">MBA (Master of Business Administration)</option>
    <option value="MCA">MCA (Master of Computer Applications)</option>
    <option value="PhD">Ph.D (Doctor of Philosophy)</option>
    <option value="Other">Other</option>
  </select>
</div>


{/* Languages */}
<div className="form-group col-lg-6 col-md-12">
  <label>Languages</label>
  <input
    type="text"
    name="languages"
    value={profile.applicantProfile.languages}
    onChange={(e) => handleInputChange(e)}
    placeholder="English, Telugu"
    required
  />
</div>

{/* Skills */}
<div className="form-group col-lg-6 col-md-12">
  <label>Skills</label>
  <Select
  isMulti
  name="skills"
  value={profile.applicantProfile.skillsForSelect}
  onChange={(selected) => {
    setProfile(prev => ({
      ...prev,
      applicantProfile: {
        ...prev.applicantProfile,
        skillsForSelect: selected
      }
    }));
  }}
  options={skillOptions}
  className="basic-multi-select"
  classNamePrefix="select"
  required
/>
</div>

{/* Description */}
<div className="form-group col-lg-12 col-md-12">
  <label>Description</label>
  <textarea 
    name="description"
    value={profile.applicantProfile.description}
    onChange={(e) => handleInputChange(e)}
    placeholder="Spent several years working on sheep on Wall Street..."
  ></textarea>
</div>

{/* Country */}
<div className="form-group col-lg-6 col-md-12">
  <label>Country</label>
  <input 
    type="text" 
    className="form-control"
    name="country"
    value={profile.applicantProfile.country}
    onChange={(e) => handleInputChange(e)}
    placeholder="Enter Country" 
    required 
  />
</div>

{/* State */}
<div className="form-group col-lg-6 col-md-12">
  <label>State</label>
  <input 
    type="text" 
    className="form-control"
    name="state"
    value={profile.applicantProfile.state}
    onChange={(e) => handleInputChange(e)}
    placeholder="Enter State" 
    required 
  />
</div>

{/* City */}
<div className="form-group col-lg-6 col-md-12">
  <label>City</label>
  <input 
    type="text" 
    className="form-control"
    name="city"
    value={profile.applicantProfile.city}
    onChange={(e) => handleInputChange(e)}
    placeholder="Enter City" 
    required 
  />
</div>

{/* Complete Address */}
<div className="form-group col-lg-6 col-md-12">
  <label>Complete Address</label>
  <input
    type="text"
    name="completeAddress"
    value={profile.applicantProfile.completeAddress}
    onChange={(e) => handleInputChange(e)}
    placeholder="Door No. 143.143, Lakshmi Mohan Residency, Tilak Road"
    required
  />
</div>
</div>
    </form>
      {/* compnay info box */}

      

      


    </div>
                </div>
              </div>
              {/* <!-- Ls widget --> */}
            </div>
          </div>

        <div className=" dashboard-outer row ls-widget tabs-box form-group col-lg-12 col-md-12  ">
        <div className="resume-outer">
      <div className="upper-title">
        <h4>Education</h4>
                <button
              type="button"
              className="add-info-btn"
              onClick={() => setShowEducationForm(true)}
            >
              <span className="icon flaticon-plus"></span> Add Education
            </button>
          
      </div>
      {showEducationForm && (
    <EducationForm
      onAdd={handleAddEducation}
      onCancel={() => setShowEducationForm(false)}
    />
  )}
      {/* <!-- Resume BLock --> */}
      {profile.education.map((edu, index) => (
            <div key={index} className="resume-block">
              <div className="inner">
                <span className="name">{edu.institution?.[0] || 'E'}</span>
                <div className="title-box">
                  <div className="info-box">
                    <h3>{edu.degree}</h3>
                    <span>{edu.institution}</span>
                  </div>
                  <div className="edit-box">
                    <span className="year">{`${edu.startYear} - ${edu.endYear}`}</span>
                    <div className="edit-btns">
                      <button type="button" onClick={() => handleRemoveSection('education', edu.id)}>
                        <span className="la la-trash"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text">{edu.description}</div>
              </div>
            </div>
          ))}
    </div>
          {/* <!-- Resume / Education --> */}

          <div className="resume-outer theme-blue">
      <div className="upper-title">
        <h4>Work & Experience</h4>
       <button
      type="button"
      className="add-info-btn"
      onClick={() => setShowExperienceForm(true)}
    >
      <span className="icon flaticon-plus"></span> Add Work
    </button>
      </div>
      
  {showExperienceForm && (
    <ExperienceForm
      onAdd={handleAddExperience}
      onCancel={() => setShowExperienceForm(false)}
    />
  )}
      {/* <!-- Resume BLock --> */}
      {profile.experiences.map((exp, index) => (
  <div key={index} className="resume-block">
    <div className="inner">
      <span className="name">{exp.companyName?.[0] || 'W'}</span>
      <div className="title-box">
        <div className="info-box">
          <h3>{exp.jobTitle}</h3>
          <span>{exp.companyName}</span>
        </div>
        <div className="edit-box">
          <span className="year">{`${exp.startYear} - ${exp.endYear}`}</span>
          <div className="edit-btns">
            <button type="button" onClick={() => handleRemoveSection('experiences', exp.id)}>
              <span className="la la-trash"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="text">{exp.description}</div>
    </div>
  </div>
))}
    </div>
          {/* <!-- Resume / Work & Experience --> */}
          <div className="resume-outer theme-yellow">
      <div className="upper-title">
        <h4>Achievements</h4>
        <button
      type="button"
      className="add-info-btn"
      onClick={() => setShowAchievementForm(true)}
    >
      <span className="icon flaticon-plus"></span> Add Achievement
    </button>
      </div>
        {showAchievementForm && (
    <AchievementForm
      onAdd={handleAddAchievement}
      onCancel={() => setShowAchievementForm(false)}
    />
  )}
      {/* <!-- Resume BLock --> */}
      {profile.achievements.map((achievement, index) => (
  <div key={index} className="resume-block">
    <div className="inner">
      <span className="name">{achievement.title?.[0] || 'A'}</span>
      <div className="title-box">
        <div className="info-box">
          <h3>{achievement.title}</h3>
          <span>{achievement.year}</span>
        </div>
        <div className="edit-box">
          <span className="year">{achievement.year}</span>
          <div className="edit-btns">
            <button type="button" onClick={() => handleRemoveSection('achievements', achievement.id)}>
              <span className="la la-trash"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="text">{achievement.description}</div>
    </div>
  </div>
))}
    </div>
<div className="default-form">
  

      <style jsx>{`
        .skills-input {
          display: flex;
          flex-direction: column;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .skill-badge {
          background-color: #f0f0f0;
          border-radius: 15px;
          padding: 20px 10px;
          margin: 5px;
          display: flex;
          align-items: center;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #ff0000;
          font-weight: bold;
          margin-left: 5px;
          cursor: pointer;
        }

        .remove-btn:hover {
          color: #ff3333;
        }

        input.form-control {
          width: 100%;
          margin-bottom: 25px;
        }
      `}</style>
    </div>
          

        </div>
        {/* <!--  education and word-experiences --> */}

        <div className="dashboard-outer row ls-widget tabs-box form-group col-lg-12 col-md-12">
  <div className="widget-title">
    <h4>Social Links</h4>
    <button
      type="button"
      className="add-info-btn"
      onClick={() => handleAddSection('socialLinks', {
        platform: '',
        url: ''
      })}
    >
      <span className="icon flaticon-plus"></span> Add Social Link
    </button>
  </div>
  <div className="default-form">
    <div className="row">
      {profile.socialLinks.map((link, index) => (
        <div key={index} className="form-group col-lg-12 col-md-12">
          <div className="row">
            <div className="form-group col-lg-5 col-md-12">
              <label>Platform</label>
              <select
                className="chosen-single form-select"
                name="platform"
                value={link.platform}
                onChange={(e) => handleSocialLinkChange(e, index)}
              >
                <option value="">Select Platform</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter">Twitter</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="GitHub">GitHub</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group col-lg-5 col-md-12">
              <label>URL</label>
              <input
                type="text"
                name="url"
                value={link.url}
                onChange={(e) => handleSocialLinkChange(e, index)}
                placeholder="https://www.example.com/profile"
              />
            </div>
            <div className="form-group col-lg-2 col-md-12 mt-4">
              <button 
                type="button" 
                onClick={() => handleRemoveSection('socialLinks', link.id)}
                className="theme-btn btn-style-three mt-2"
              >
                <span className="la la-trash"></span> Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
        {/* <!--  education and word-experiences --> */}





          <div className="form-group col-lg-6 col-md-12">
            <button onClick={handleSubmit} className="theme-btn btn-style-one">
              Save
            </button>
          </div>
          {/* End .row */}
        </div>
        
        {/* End dashboard-outer */}
      </section>
      
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
