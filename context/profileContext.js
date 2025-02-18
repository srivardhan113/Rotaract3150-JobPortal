import { createContext, useState, useContext } from "react";
import axios from "axios";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    userId: "", // Store user ID when available
    applicantProfile: {},
    education: [],
    experiences: [],
    achievements: [],
    socialLinks: [],
    toDelete: {
      education: [],
      experiences: [],
      achievements: [],
      socialLinks: [],
    },
  });

  // Function to update form data
  const updateProfileData = (section, data) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  // Function to mark an item for deletion
  const markForDeletion = (section, id) => {
    setProfileData((prev) => ({
      ...prev,
      toDelete: {
        ...prev.toDelete,
        [section]: [...prev.toDelete[section], id],
      },
    }));
  };

  // Function to submit all form data to the API
  const submitProfile = async () => {
    try {
      const response = await axios.post("/api/profile", profileData);
      console.log("Profile Updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData, markForDeletion, submitProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use ProfileContext
export const useProfile = () => useContext(ProfileContext);
